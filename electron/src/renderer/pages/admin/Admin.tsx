import { useState } from 'react';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { PlayerDataProps, Timeslot } from '../players/components/Types';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { IpcChannels } from '../../../general/IpcChannels';
import {
    PrismaCall,
    ModelName,
    CrudOperations,
} from '../../../general/prismaTypes';
import { Location } from '../roster/Resources';

type QueryModel =
    | ModelName.player
    | ModelName.team
    | ModelName.game
    | ModelName.timeslot
    | ModelName.ageGroup;

type QueryFilters = {
    search: string;
    id: string;
    ageGroupId: string;
    earliestDate: string;
    latestDate: string;
    location: Location | '';
    court: string;
};

const toStartOfDay = (dateValue: string) => {
    const date = new Date(dateValue);
    date.setHours(0, 0, 0, 0);
    return date;
};

const toEndOfDay = (dateValue: string) => {
    const date = new Date(dateValue);
    date.setHours(23, 59, 59, 999);
    return date;
};

const Admin = () => {
    const [entryId, setEntryId] = useState('');
    const [entryData, setEntryData] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [modelName, setModelName] = useState<ModelName>(ModelName.player);
    const [queryModel, setQueryModel] = useState<QueryModel>(ModelName.player);
    const [queryFilters, setQueryFilters] = useState<QueryFilters>({
        search: '',
        id: '',
        ageGroupId: '',
        earliestDate: '',
        latestDate: '',
        location: '',
        court: '',
    });
    const [queryResults, setQueryResults] = useState('');
    const [isQuerying, setIsQuerying] = useState(false);

    const buildQueryRequest = (): PrismaCall => {
        const where: Record<string, unknown> = {};

        if (queryFilters.id) {
            where.id = queryFilters.id;
        }

        if (queryFilters.ageGroupId) {
            where.ageGroupId = queryFilters.ageGroupId;
        }

        if (queryModel === ModelName.player && queryFilters.search) {
            where.OR = [
                { firstName: { contains: queryFilters.search, mode: 'insensitive' } },
                { lastName: { contains: queryFilters.search, mode: 'insensitive' } },
            ];
        }

        if (queryModel === ModelName.team && queryFilters.search) {
            where.name = { contains: queryFilters.search, mode: 'insensitive' };
        }

        if (queryModel === ModelName.ageGroup && queryFilters.search) {
            where.displayName = {
                contains: queryFilters.search,
                mode: 'insensitive',
            };
        }

        if (queryModel === ModelName.timeslot || queryModel === ModelName.game) {
            const timeslotWhere: Record<string, unknown> = {};

            if (queryFilters.earliestDate) {
                timeslotWhere.date = {
                    ...(timeslotWhere.date as Record<string, unknown>),
                    gte: toStartOfDay(queryFilters.earliestDate),
                };
            }

            if (queryFilters.latestDate) {
                timeslotWhere.date = {
                    ...(timeslotWhere.date as Record<string, unknown>),
                    lte: toEndOfDay(queryFilters.latestDate),
                };
            }

            if (queryFilters.location) {
                timeslotWhere.location = queryFilters.location;
            }

            if (queryFilters.court) {
                timeslotWhere.court = Number(queryFilters.court);
            }

            if (queryFilters.ageGroupId) {
                timeslotWhere.ageGroupId = queryFilters.ageGroupId;
            }

            if (Object.keys(timeslotWhere).length > 0) {
                if (queryModel === ModelName.timeslot) {
                    Object.assign(where, timeslotWhere);
                } else {
                    where.timeslot = timeslotWhere;
                }
            }
        }

        if (queryModel === ModelName.game && queryFilters.search) {
            where.OR = [
                {
                    lightTeam: {
                        name: {
                            contains: queryFilters.search,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    darkTeam: {
                        name: {
                            contains: queryFilters.search,
                            mode: 'insensitive',
                        },
                    },
                },
            ];
        }

        const includeByModel: Record<string, unknown> = {
            [ModelName.player]: {
                team: true,
                ageGroup: true,
            },
            [ModelName.team]: {
                ageGroup: true,
            },
            [ModelName.game]: {
                lightTeam: true,
                darkTeam: true,
                timeslot: true,
            },
            [ModelName.timeslot]: {
                ageGroup: true,
                game: true,
            },
        };

        return {
            model: queryModel,
            operation: CrudOperations.findMany,
            data: {
                where,
                ...(includeByModel[queryModel]
                    ? { include: includeByModel[queryModel] }
                    : {}),
            },
        };
    };

    const runQuery = async () => {
        try {
            setIsQuerying(true);
            const prismaRequest = buildQueryRequest();
            console.log('[Admin] Running query', prismaRequest);

            const data = await window.electron.ipcRenderer.invoke(
                IpcChannels.PrismaClient,
                prismaRequest,
            );

            setQueryResults(JSON.stringify(data, null, 2));
            console.log('[Admin] Query results', {
                model: queryModel,
                count: Array.isArray(data) ? data.length : 1,
            });
        } catch (error) {
            console.error('Error querying data:', error);
            setQueryResults(JSON.stringify(error, null, 2));
        } finally {
            setIsQuerying(false);
        }
    };

    const fetchEntryData = async () => {
        console.log(`Fetching data for ${modelName} with ID: ${entryId}`);
        setIsFetching(true);
        if (!entryId) {
            try {
                const prismaRequest: PrismaCall = {
                    model: modelName, // Change model as needed
                    operation: CrudOperations.findMany,
                    data: {},
                };

                const data = await window.electron.ipcRenderer.invoke(
                    IpcChannels.PrismaClient,
                    prismaRequest,
                );
                setEntryData(JSON.stringify(data, null, 2));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const prismaRequest: PrismaCall = {
                    model: modelName, // Change model as needed
                    operation: CrudOperations.findUnique,
                    data: { where: { id: entryId } },
                };

                const data = await window.electron.ipcRenderer.invoke(
                    IpcChannels.PrismaClient,
                    prismaRequest,
                );
                setEntryData(JSON.stringify(data, null, 2));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        setIsFetching(false);
    };

    const updateEntryData = async () => {
        try {
            const parsedData = JSON.parse(entryData);
            const prismaRequest: PrismaCall = {
                model: modelName, // Change model as needed
                operation: CrudOperations.update,
                data: { where: { id: entryId }, data: parsedData },
            };
            await window.electron.ipcRenderer.invoke(
                IpcChannels.PrismaClient,
                prismaRequest,
            );
            alert('Entry updated successfully!');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const deleteEntry = async () => {
        try {
            const prismaRequest: PrismaCall = {
                model: modelName, // Change model as needed
                operation: CrudOperations.delete,
                data: { where: { id: entryId } },
            };
            await window.electron.ipcRenderer.invoke(
                IpcChannels.PrismaClient,
                prismaRequest,
            );
            setEntryData('');
            alert('Entry deleted successfully!');
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const deleteAllEntries = async () => {
        try {
            const prismaRequest: PrismaCall = {
                model: modelName, // Change model as needed
                operation: CrudOperations.deleteMany,
                data: {},
            };
            await window.electron.ipcRenderer.invoke(
                IpcChannels.PrismaClient,
                prismaRequest,
            );
            setEntryData('');
            alert('ALL ENTRIES deleted successfully!');
        } catch (error) {
            console.error('Error deleting entries:', error);
        }
    };

    const decrementAllTimeslotsByOneHour = async () => {
        // 1. Get all timeslots
        let originalTimeslots;
        try {
            const prismaRequest: PrismaCall = {
                model: ModelName.timeslot, // Change model as needed
                operation: CrudOperations.findMany,
                data: {},
            };
            const data = await window.electron.ipcRenderer.invoke(
                IpcChannels.PrismaClient,
                prismaRequest,
            );
            originalTimeslots = data as Timeslot[];
            console.log('Step 1 done. Here are all timeslots:');
            console.log(originalTimeslots);
        } catch (error) {
            console.error('Error decrementing timeslots:', error);
        }

        // 2. Decrement all timeslots by 1 hour
        if (!originalTimeslots) return;
        let newTimeslots = originalTimeslots.map((timeslot) => {
            const newDate = new Date(timeslot.date);
            newDate.setUTCHours(newDate.getUTCHours() - 1);
            return {
                ...timeslot,
                date: newDate.toISOString(),
            };
        });

        console.log('Step 2: Decrementing all timeslots by 1 hour');
        console.log(newTimeslots);

        // 3. Delete all timeslots
        try {
            const prismaRequest: PrismaCall = {
                model: ModelName.timeslot, // Change model as needed
                operation: CrudOperations.deleteMany,
                data: {},
            };
            await window.electron.ipcRenderer.invoke(
                IpcChannels.PrismaClient,
                prismaRequest,
            );
            console.log('Step 3 done. All timeslots deleted.');
        } catch (error) {
            console.error('Error deleting timeslots:', error);
        }

        // 4. Create new timeslots
        try {
            const prismaRequest: PrismaCall = {
                model: ModelName.timeslot, // Change model as needed
                operation: CrudOperations.createManyAndReturn,
                data: { data: newTimeslots },
            };
            await window.electron.ipcRenderer.invoke(
                IpcChannels.PrismaClient,
                prismaRequest,
            );
            console.log('Step 4 done. New timeslots created.');
        } catch (error) {
            console.error('Error uploading new timeslots:', error);
        }
    };

    return (
        <PageContainer>
            <PageTitle text="Admin Panel" />
            <div className="flex flex-col gap-4 p-4">
                <div className="rounded-lg border bg-white p-4 shadow-sm flex flex-col gap-4">
                    <h2 className="font-bold text-lg">Database Query</h2>
                    <div className="flex flex-wrap gap-4 items-end">
                        <FormControl sx={{ minWidth: 220 }}>
                            <InputLabel id="query-model-label">
                                Model
                            </InputLabel>
                            <Select
                                labelId="query-model-label"
                                value={queryModel}
                                label="Model"
                                onChange={(e) =>
                                    setQueryModel(e.target.value as QueryModel)
                                }
                            >
                                <MenuItem value={ModelName.player}>
                                    Players
                                </MenuItem>
                                <MenuItem value={ModelName.team}>
                                    Teams
                                </MenuItem>
                                <MenuItem value={ModelName.game}>
                                    Games
                                </MenuItem>
                                <MenuItem value={ModelName.timeslot}>
                                    Timeslots
                                </MenuItem>
                                <MenuItem value={ModelName.ageGroup}>
                                    Age Groups
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={queryFilters.search}
                            onChange={(e) =>
                                setQueryFilters((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Exact ID"
                            variant="outlined"
                            value={queryFilters.id}
                            onChange={(e) =>
                                setQueryFilters((prev) => ({
                                    ...prev,
                                    id: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Age Group ID"
                            variant="outlined"
                            value={queryFilters.ageGroupId}
                            onChange={(e) =>
                                setQueryFilters((prev) => ({
                                    ...prev,
                                    ageGroupId: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Earliest Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={queryFilters.earliestDate}
                            onChange={(e) =>
                                setQueryFilters((prev) => ({
                                    ...prev,
                                    earliestDate: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Latest Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={queryFilters.latestDate}
                            onChange={(e) =>
                                setQueryFilters((prev) => ({
                                    ...prev,
                                    latestDate: e.target.value,
                                }))
                            }
                        />
                        <FormControl sx={{ minWidth: 140 }}>
                            <InputLabel id="query-location-label">
                                Location
                            </InputLabel>
                            <Select
                                labelId="query-location-label"
                                value={queryFilters.location}
                                label="Location"
                                onChange={(e) =>
                                    setQueryFilters((prev) => ({
                                        ...prev,
                                        location: e.target.value as
                                            | Location
                                            | '',
                                    }))
                                }
                            >
                                <MenuItem value="">Any</MenuItem>
                                <MenuItem value={Location.ST_IVES}>
                                    St Ives
                                </MenuItem>
                                <MenuItem value={Location.BELROSE}>
                                    Belrose
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Court"
                            variant="outlined"
                            value={queryFilters.court}
                            onChange={(e) =>
                                setQueryFilters((prev) => ({
                                    ...prev,
                                    court: e.target.value,
                                }))
                            }
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                runQuery();
                            }}
                            disabled={isQuerying}
                        >
                            Submit Query
                        </Button>
                    </div>
                    <textarea
                        className="w-full min-h-64 border p-3 rounded bg-gray-50 font-mono text-sm"
                        value={queryResults}
                        readOnly
                    />
                </div>
                <div>
                    <Select
                        value={modelName}
                        onChange={(e) =>
                            setModelName(e.target.value as ModelName)
                        }
                    >
                        <MenuItem value={ModelName.player}>Players</MenuItem>
                        <MenuItem value={ModelName.team}>Teams</MenuItem>
                        <MenuItem value={ModelName.game}>Games</MenuItem>
                        <MenuItem value={ModelName.timeslot}>Timeslot</MenuItem>
                        <MenuItem value={ModelName.ageGroup}>
                            Age Groups
                        </MenuItem>
                    </Select>
                </div>
                <div className="pt-8">
                    <h2 className="font-bold pb-4 text-lg">{modelName}</h2>
                    <div className="flex flex-row gap-4 justify-start w-1/2">
                        <TextField
                            label="Entry ID"
                            variant="outlined"
                            value={entryId}
                            onChange={(e) => setEntryId(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                fetchEntryData();
                            }}
                            disabled={isFetching}
                        >
                            Fetch Data
                        </Button>
                    </div>
                    <textarea
                        className="w-full h-40 border p-2 rounded"
                        value={entryData}
                        onChange={(e) => setEntryData(e.target.value)}
                    />
                    <div className="flex flex-row gap-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateEntryData();
                            }}
                        >
                            Submit Updates
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                deleteEntry();
                            }}
                        >
                            Delete Entry
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                deleteAllEntries();
                            }}
                        >
                            Delete ALL ENTRIES
                        </Button>
                        {/* <Button
                            variant="contained" 
                            color="error" 
                            onClick={() => {
                                decrementAllTimeslotsByOneHour();
                            }}
                        >
                            decrement
                        </Button> */}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Admin;
