import { useState } from "react";
import PageContainer from "../../ui_components/PageContainer";
import PageTitle from "../../ui_components/PageTitle";
import { PlayerDataProps } from "../players/components/Types";
import { TextField, Button, MenuItem, Select } from "@mui/material";
import { IpcChannels } from "../../../general/IpcChannels";
import { PrismaCall, ModelName, CrudOperations } from "../../../general/prismaTypes";

const Admin = () => {
    const [entryId, setEntryId] = useState("");
    const [entryData, setEntryData] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [modelName, setModelName] = useState<ModelName>(ModelName.player);

    const fetchEntryData = async () => {
        console.log(`Fetching data for ${modelName} with ID: ${entryId}`);
        setIsFetching(true);
        if (!entryId) {
            try {
                const prismaRequest: PrismaCall = {
                    model: modelName, // Change model as needed
                    operation: CrudOperations.findMany,
                    data: { },
                };
                
                const data = await window.electron.ipcRenderer.invoke(IpcChannels.PrismaClient, prismaRequest);
                setEntryData(JSON.stringify(data, null, 2));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        else {
            try {
                const prismaRequest: PrismaCall = {
                    model: modelName, // Change model as needed
                    operation: CrudOperations.findUnique,
                    data: { where: { id: entryId } },
                };
                
                const data = await window.electron.ipcRenderer.invoke(IpcChannels.PrismaClient, prismaRequest);
                setEntryData(JSON.stringify(data, null, 2));
            } catch (error) {
                console.error("Error fetching data:", error);
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
            await window.electron.ipcRenderer.invoke(IpcChannels.PrismaClient, prismaRequest);
            alert("Entry updated successfully!");
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const deleteEntry = async () => {
        try {
            const prismaRequest: PrismaCall = {
                model: modelName, // Change model as needed
                operation: CrudOperations.delete,
                data: { where: { id: entryId } },
            };
            await window.electron.ipcRenderer.invoke(IpcChannels.PrismaClient, prismaRequest);
            setEntryData("");
            alert("Entry deleted successfully!");
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    const deleteAllEntries = async () => {
        try {
            const prismaRequest: PrismaCall = {
                model: modelName, // Change model as needed
                operation: CrudOperations.deleteMany,
                data: {},
            };
            await window.electron.ipcRenderer.invoke(IpcChannels.PrismaClient, prismaRequest);
            setEntryData("");
            alert("ALL ENTRIES deleted successfully!");
        } catch (error) {
            console.error("Error deleting entries:", error);
        }
    };

    return (
        <PageContainer>
            <PageTitle text="Admin Panel" />
            <div className="flex flex-col gap-4 p-4">
                <div>
                    <Select
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value as ModelName)}
                    >
                        <MenuItem value={ModelName.player}>Players</MenuItem>
                        <MenuItem value={ModelName.team}>Teams</MenuItem>
                        <MenuItem value={ModelName.game}>Games</MenuItem>
                        <MenuItem value={ModelName.timeslot}>Timeslot</MenuItem>
                        <MenuItem value={ModelName.ageGroup}>Age Groups</MenuItem>
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
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Admin;