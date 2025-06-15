import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { PlayerDataProps } from '../players/components/Types';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import { IpcChannels } from '../../../general/IpcChannels';
import FormCancelSave from '../../ui_components/FormCancelSave';
import Terms2025 from '../data/Terms';
import { WeekTabPanel } from './WeekTabPanel';
import { RowData, timeSlotParams } from './util/types';
import {
    getWeekDateFromTerm,
    hourSlots,
    venueCourts,
    ADULTS_AGE_GROUP_ID,
    getTermWeek,
} from './util/util';

const uploadTimeSlots = async (timeSlotParams: timeSlotParams[]) => {
    const timeSlotsWithIds: timeSlotParams[] = [];

    const promises = timeSlotParams.map((timeSlot) => {
        const timeSlotRequest: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.upsert,
            data: {
                where: {
                    location_date_court: {
                        location: timeSlot.location,
                        date: timeSlot.date,
                        court: timeSlot.court,
                    },
                },
                update: {},
                create: {
                    location: timeSlot.location,
                    date: timeSlot.date,
                    court: timeSlot.court,
                    ageGroupId: 'b3ad7e4e-acbe-4dfd-90e1-5d7d6bd2ad41', // TODO: Fetch this dynamically
                },
                select: {
                    id: true,
                    location: true,
                    date: true,
                    court: true,
                    ageGroupId: true,
                },
            },
        };

        return window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, timeSlotRequest)
            .then((data: { id: string; ageGroupId?: string | null }) => {
                timeSlotsWithIds.push({
                    ...timeSlot,
                    id: data.id,
                    ageGroupId: data.ageGroupId ?? 'noEvent', // Include ageGroupId if present
                });
            })
            .catch((error: Error) => {
                console.error(
                    `Error upserting time slot for court ${timeSlot.court}:`,
                    error,
                );
            });
    });

    await Promise.all(promises);
    return timeSlotsWithIds;
};

export const TermSetup = (props: PlayerDataProps) => {
    const { ageGroups } = props;

    const [currentWeekTab, setCurrentWeekTab] = useState(getTermWeek(new Date()).week); // 0-indexed
    const [currentTerm, setCurrentTerm] = useState(getTermWeek(new Date())?.term); // 0-3
    const [isSundayComp, setIsSundayComp] = useState(true);
    const [loading, setLoading] = useState(true);

    const [dbTimeSlots, setDbTimeSlots] = useState<timeSlotParams[]>([]); // For storing fetched time slots
    const [modifiedTimeSlots, setModifiedTimeSlots] = useState<
        timeSlotParams[]
    >([]);

    const [copyToAllWeeksConfirmation, setCopyToAllWeeksConfirmation] =
        useState(false);

    const [adultsRows, setAdultsRows] = useState<RowData[]>(
        dbTimeSlots
            .filter(
                (timeSlot) => timeSlot.ageGroupId === ADULTS_AGE_GROUP_ID, // adults
            )
            .map((timeSlot) => ({
                time: moment(timeSlot.date).format('h:mm A'),
                court: timeSlot.court,
                venue: timeSlot.location === 'ST_IVES' ? 'St Ives' : 'Belrose',
                id: timeSlot.id ?? '',
            })),
    );

    const copyToAllWeeks = () => {
        // Copy the current week's time slots to all other weeks.
        setCopyToAllWeeksConfirmation(false);
        console.log(modifiedTimeSlots);
        const currentWeekDate = getWeekDateFromTerm(
            currentTerm,
            currentWeekTab,
        );
        console.log(`Attempting to copy games from week ${currentWeekDate}`);

        for (let i = 1; i < Terms2025[currentTerm].weeks; i += 1) {
            upsert(currentTerm, i);
        }

        const allPrismaTimeSlotsReq: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.findMany,
            data: {},
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, allPrismaTimeSlotsReq)
            .then((data: timeSlotParams[]) => {
                const allTimeSlots = data;

                // filter the time slots to only include timeslots that occur within +/- 24 hours of the currentWeekDate
                const currentWeekTimeSlots = allTimeSlots.filter(
                    (timeSlot) =>
                        Math.abs(
                            timeSlot.date.getTime() - currentWeekDate.getTime(),
                        ) <=
                        24 * 60 * 60 * 1000,
                );

                console.log('Current week time slots:');
                console.log(currentWeekTimeSlots);

                const promises = allTimeSlots
                    .filter(
                        (timeSlot) =>
                            !(
                                Math.abs(
                                    timeSlot.date.getTime() -
                                        currentWeekDate.getTime(),
                                ) <=
                                24 * 60 * 60 * 1000
                            ),
                    )
                    .map((timeSlot) => {
                        const currentWeekTimeSlot = currentWeekTimeSlots.find(
                            (currentWeekTimeSlot) =>
                                currentWeekTimeSlot.location ===
                                    timeSlot.location &&
                                currentWeekTimeSlot.court === timeSlot.court &&
                                currentWeekTimeSlot.date.getHours() ===
                                    timeSlot.date.getHours(),
                        );

                        if (currentWeekTimeSlot) {
                            const timeSlotRequest: PrismaCall = {
                                model: ModelName.timeslot,
                                operation: CrudOperations.update,
                                data: {
                                    where: {
                                        id: timeSlot.id,
                                    },
                                    data: {
                                        ageGroupId:
                                            currentWeekTimeSlot.ageGroupId ===
                                            'noEvent'
                                                ? null
                                                : currentWeekTimeSlot.ageGroupId,
                                    },
                                },
                            };

                            return window.electron.ipcRenderer
                                .invoke(
                                    IpcChannels.PrismaClient,
                                    timeSlotRequest,
                                )
                                .then(() => {
                                    console.log(
                                        `Updated time slot for ${timeSlot.location} court ${timeSlot.court}`,
                                    );
                                })
                                .catch((error: Error) => {
                                    console.error(
                                        `Error updating time slot for ${timeSlot.location} court ${timeSlot.court}:`,
                                        error,
                                    );
                                });
                        }
                        return Promise.resolve();
                    });

                Promise.all(promises).then(() => {
                    console.log('Finished copying time slots');
                    toast.success(
                        `${promises.length} time slot${
                            promises.length === 1 ? '' : 's'
                        } created across ${
                            promises.length / dbTimeSlots.length
                        } weeks successfully!`,
                    );
                });
            });
    };

    const uploadChanges = () => {
        const sundayTimeSlotsToUpdate = modifiedTimeSlots.filter(
            (timeSlot) =>
                timeSlot.ageGroupId !== ADULTS_AGE_GROUP_ID && // Exclude adults age group
                (!dbTimeSlots.find(
                    (dbTimeSlot) => dbTimeSlot.id === timeSlot.id,
                ) ||
                    dbTimeSlots.find(
                        (dbTimeSlot) =>
                            dbTimeSlot.id === timeSlot.id &&
                            (dbTimeSlot.ageGroupId !== timeSlot.ageGroupId ||
                                dbTimeSlot.placeholder !==
                                    timeSlot.placeholder),
                    )),
        );

        // ### begin handling sunday games ###

        const promises = sundayTimeSlotsToUpdate.map((timeSlot) => {
            const timeSlotRequest: PrismaCall = {
                model: ModelName.timeslot,
                operation: CrudOperations.update,
                data: {
                    where: {
                        id: timeSlot.id,
                    },
                    data: {
                        ageGroupId:
                            timeSlot.ageGroupId === 'noEvent'
                                ? null
                                : timeSlot.ageGroupId,
                        placeholder: timeSlot.placeholder,
                        placeholderReason: timeSlot.placeholderReason
                    },
                },
            };

            return window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, timeSlotRequest)
                .then(() => {
                    console.log(`Updated time slot for `);
                    console.log(timeSlot);
                })
                .catch((error: Error) => {
                    console.error(
                        `Error updating time slot for ${timeSlot}:`,
                        error,
                    );
                    console.error(timeSlot);
                });
        });

        Promise.all(promises).then(() => {
            setDbTimeSlots(modifiedTimeSlots);
        });

        toast.success(
            `${promises.length} time slot${
                promises.length === 1 ? '' : 's'
            } updated successfully`,
        );
    };

    const checkIfTimeSlotsEqual = () => {
        if (dbTimeSlots.length !== modifiedTimeSlots.length) {
            return false;
        }

        for (let i = 0; i < dbTimeSlots.length; i += 1) {
            if (dbTimeSlots[i].ageGroupId !== modifiedTimeSlots[i].ageGroupId) {
                console.log('DB time slots:');
                console.log(dbTimeSlots[i]);
                console.log('Modified time slots:');
                console.log(modifiedTimeSlots[i]);
                return false;
            }

            if (dbTimeSlots[i].placeholder !== modifiedTimeSlots[i].placeholder) {
                console.log("placeholder values have been updated")
                return false;
            }
        }
        return true;
    };

    const upsert = async (
        term: number = currentTerm,
        weekTab: number = currentWeekTab,
    ) => {
        setLoading(true);
        if (!isSundayComp) return;

        // Fetches or creates all time slots for the current week and term.
        // Stores into dbTimeSlots.
        // https://github.com/prisma/docs/issues/640
        // https://www.prisma.io/docs/concepts/components/prisma-client/crud#upsert

        const dateForRequest = getWeekDateFromTerm(term, weekTab);
        const weekRequestData: timeSlotParams[] = [];
        // loop through each venue, and then iterate through each court
        Object.keys(venueCourts).forEach((venue) => {
            for (
                let i = 1;
                i <= venueCourts[venue as keyof typeof venueCourts];
                i += 1
            ) {
                // Loop through each hour slot and append the hour to the dateForRequest,
                // create a new timeSlot and append to requestData.
                hourSlots.forEach((hour) => {
                    const time = moment(hour.time, 'hha');
                    let finalMoment = moment(dateForRequest);
                    finalMoment = finalMoment.set({
                        hour: time.hours(),
                        minute: time.minutes(),
                        second: 0,
                    });
                    finalMoment = finalMoment.tz('Australia/Sydney');

                    const dbLocation =
                        venue === 'St Ives' ? 'ST_IVES' : 'BELROSE';
                    const finalTimeSlot: timeSlotParams = {
                        date: finalMoment.toDate(),
                        location: dbLocation,
                        court: i,
                    };

                    weekRequestData.push(finalTimeSlot);
                });
            }
        });

        const dataWithIds = await uploadTimeSlots(weekRequestData);
        setDbTimeSlots(dataWithIds);
        setModifiedTimeSlots(dataWithIds);
        if (dataWithIds.length > 0) {
            setLoading(false);
        }
        getAdultGames();
    };

    const getAdultGames = () => {
        const minDate = getWeekDateFromTerm(currentTerm, currentWeekTab, false);
        const maxDate = moment(minDate).add(1, 'day').toDate();
        const req: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.findMany,
            data: {
                where: {
                    ageGroupId: ADULTS_AGE_GROUP_ID,
                    date: {
                        lte: maxDate,
                        gte: minDate,
                    },
                },
            },
        };
        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, req)
            .then((data: timeSlotParams[]) => {
                const adultsTimeSlots = data;
                if (adultsTimeSlots) {
                    setAdultsRows(
                        adultsTimeSlots.map((timeSlot) => ({
                            time: moment(timeSlot.date).format('h:mm A'),
                            court: timeSlot.court,
                            venue:
                                timeSlot.location === 'ST_IVES'
                                    ? 'St Ives'
                                    : 'Belrose',
                            id: timeSlot.id ? timeSlot.id : '',
                        })),
                    );
                }
            });
    };

    useEffect(() => {
        upsert();
    }, [currentTerm, currentWeekTab]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    const { weeks } = Terms2025[currentTerm];

    const navigateTerm = (fowards: boolean) => {
        if (currentTerm === 0 && !fowards) {
            setCurrentTerm(3);
        } else if (currentTerm === 3 && fowards) {
            setCurrentTerm(0);
        } else if (fowards) {
            setCurrentTerm(currentTerm + 1);
        } else {
            setCurrentTerm(currentTerm - 1);
        }
    };

    return (
        <PageContainer>
            <PageTitle text="Term Setup" />
            <div className="text-xl font-bold float-right flex gap-2">
                <button
                    type="button"
                    onClick={() => {
                        navigateTerm(false);
                    }}
                >
                    <ArrowLeftCircleIcon className="h-8 w-8 hover:text-red-400" />
                </button>
                <p>Term {currentTerm + 1} 2025</p>
                <button
                    type="button"
                    onClick={() => {
                        navigateTerm(true);
                    }}
                >
                    <ArrowRightCircleIcon className="h-8 w-8 hover:text-red-400" />
                </button>
            </div>
            <div className="pt-2">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={currentWeekTab}
                            onChange={(_, newValue) =>
                                setCurrentWeekTab(newValue)
                            }
                            aria-label="Week Tabs"
                        >
                            {Array.from({ length: weeks }, (_, i) => (
                                <Tab key={i} label={`Week ${i + 1}`} />
                            ))}
                        </Tabs>
                    </Box>
                    <div className="pt-4">
                        {Array.from({ length: weeks }, (_, i) => (
                            <WeekTabPanel
                                key={i}
                                term={currentTerm}
                                value={currentWeekTab}
                                index={i}
                                ageGroups={ageGroups}
                                dbTimeSlots={dbTimeSlots}
                                setModifiedTimeSlots={setModifiedTimeSlots}
                                modifiedTimeSlots={modifiedTimeSlots}
                                isSundayComp={isSundayComp}
                                setIsSundayComp={setIsSundayComp}
                                adultsRows={adultsRows}
                                setAdultsRows={setAdultsRows}
                                isLoading={loading}
                            />
                        ))}
                    </div>
                </Box>
            </div>
            <div className="w-1/3 pt-4 pb-16">
                <div className="w-1/2 flex flex-col pb-8">
                    <Button
                        variant="contained"
                        onClick={() => setCopyToAllWeeksConfirmation(true)}
                    >
                        Copy to all weeks
                    </Button>
                </div>
                <FormCancelSave
                    cancelButtonDisabled={checkIfTimeSlotsEqual()}
                    saveButtonDisabled={checkIfTimeSlotsEqual()}
                    onCancelClick={() => {
                        setModifiedTimeSlots(dbTimeSlots);
                    }}
                    onSaveClick={uploadChanges}
                />
            </div>
            {copyToAllWeeksConfirmation ? (
                <div className="pt-4">
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-center">
                            <h2 className="text-xl font-semibold mb-4">
                                Copy to all weeks?
                            </h2>
                            <div>
                                <p className="text-gray-600 pt-4 mb-4">
                                    This will override all future events for
                                    this term. This action cannot be undone.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() =>
                                            setCopyToAllWeeksConfirmation(false)
                                        }
                                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        onClick={() => {
                                            copyToAllWeeks();
                                        }}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </PageContainer>
    );
};

export default TermSetup;
