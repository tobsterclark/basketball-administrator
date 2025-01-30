import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PageContainer from "../../ui_components/PageContainer";
import PageTitle from "../../ui_components/PageTitle";
import { AgeGroupDataResponse, PlayerDataProps } from "../players/components/Types";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import FormCancelSave from "../../ui_components/FormCancelSave";
import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CrudOperations, ModelName, PrismaCall } from "../../../general/prismaTypes";
import { IpcChannels } from "../../../general/IpcChannels";
import { toast } from "react-toastify";

export const AgeGroups = (props: PlayerDataProps) => {
    const getAgeGroups = props.getAgeGroups;
    const [ageGroups, setAgeGroups] = useState(props.ageGroups);
    const [modifiedAgeGroups, setModifiedAgeGroups] = useState(ageGroups);
    const [deletePopupId, setDeletePopupId] = useState('');

    const cancel = () => {
        setModifiedAgeGroups(ageGroups);
    }

    const addAgeGroup = () => {
        const i = modifiedAgeGroups.length - ageGroups.length + 1;
        const newAgeGroup = {
            id: `new${i}`,
            displayName: '',
        };
        setModifiedAgeGroups([...modifiedAgeGroups, newAgeGroup]);
    }

    const handleDelete = () => {
        const prismaCall: PrismaCall = {
            model: ModelName.ageGroup,
            operation: CrudOperations.delete,
            data: {
                where: {
                    id: deletePopupId,
                },
            },
        }
        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, prismaCall)
            .then((data) => {
                // update ageGroups state to exclude the deleted ageGroup
                const updatedAgeGroups = ageGroups.filter(group => group.id !== deletePopupId);
                setAgeGroups(updatedAgeGroups);
                setModifiedAgeGroups(updatedAgeGroups);
                setDeletePopupId('');
                if (getAgeGroups) {
                    getAgeGroups();
                }
                toast.success(`Age Group deleted!`);
            });
    }

    const handleSave = () => {
        const updatedAgeGroups = [...ageGroups];
        const newAgeGroups = modifiedAgeGroups.filter(group => group.id.startsWith('new'));
    
        // Update existing age groups
        ageGroups.forEach((ageGroup) => {
            const modifiedAgeGroup = modifiedAgeGroups.find(group => group.id === ageGroup.id);
            if (modifiedAgeGroup && modifiedAgeGroup.displayName !== ageGroup.displayName) {
                const prismaCall: PrismaCall = {
                    model: ModelName.ageGroup,
                    operation: CrudOperations.update,
                    data: {
                        where: {
                            id: ageGroup.id,
                        },
                        data: {
                            displayName: modifiedAgeGroup.displayName,
                        },
                    },
                };
                window.electron.ipcRenderer
                    .invoke(IpcChannels.PrismaClient, prismaCall)
                    .then((data) => {
                        // Update the ageGroups state to include the modified ageGroup
                        const index = updatedAgeGroups.findIndex(group => group.id === ageGroup.id);
                        if (index !== -1) {
                            updatedAgeGroups[index] = {
                                ...updatedAgeGroups[index],
                                displayName: modifiedAgeGroup.displayName,
                            };
                        }
                        toast.success(`${modifiedAgeGroup.displayName} updated!`);
                    });
            }
        });
    
        // Add new age groups
        newAgeGroups.forEach((newAgeGroup) => {
            const prismaCall: PrismaCall = {
                model: ModelName.ageGroup,
                operation: CrudOperations.create,
                data: {
                    data: {
                        displayName: newAgeGroup.displayName,
                    },
                },
            };
            window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, prismaCall)
                .then((data) => {

                    // Update the ageGroups state to include the new ageGroup
                    updatedAgeGroups.push(data as AgeGroupDataResponse);
                    toast.success(`${newAgeGroup.displayName} added!`);
                });
        });
    
        // Update the state after all operations
        setAgeGroups(updatedAgeGroups);
        setModifiedAgeGroups(updatedAgeGroups);
    
        // Optionally, refresh the age groups from the database
        if (getAgeGroups) {
            getAgeGroups();
        }
    };

    const deletePopup = () => {
        const ageGroupDisplayName = ageGroups.find(group => group.id === deletePopupId)?.displayName;
        return (
            <div className='pt-4'>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-center">
                        <h2 className="text-xl font-semibold mb-4">Delete Age Group?</h2>
                        
                        <div>
                            <p className="text-gray-600 pt-1 mb-6">
                                Are you sure you want to delete <span className="font-bold">{ageGroupDisplayName}</span>? This action cannot be undone.
                            </p>
                            <div className='flex gap-4 justify-center font-semibold'>
                                <button 
                                    className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                    onClick={() => setDeletePopupId('')}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() => handleDelete()}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }


    return (
        <PageContainer>
            <PageTitle text='Age Groups' />
            <p className="pt-4 text-md">Use this page to edit, create, or delete age groups.</p>
            <div className='flex flex-col gap-4 pt-12 w-3/5'>
                {
                    modifiedAgeGroups.map((ageGroup) => {
                        const isChanged = ageGroups.find(group => group.id === ageGroup.id)?.displayName !== ageGroup.displayName;
                        return (
                            <div key={ageGroup.id} className="flex flex-row gap-4">
                                <div className="w-1/2">
                                    {!ageGroup.id.startsWith('new') ? (
                                        <div>
                                            <TextField 
                                                variant="filled" 
                                                value={ageGroups.find(group => group.id === ageGroup.id)?.displayName || ''} 
                                                label="Current Name" 
                                                fullWidth 
                                                InputProps={{ readOnly: true }} 
                                            />
                                        </div>
                                    ) : null}
                                    
                                </div>
                                <div className="pt-2">
                                    <ChevronDoubleRightIcon className="w-10 h-10 text-black" />
                                </div>
                                <div className="w-full flex items-center justify-left gap-4">
                                    <div className="flex items-center justify-left gap-8">
                                        <TextField 
                                            variant="filled" 
                                            value={ageGroup?.displayName} 
                                            label="New Name" 
                                            onChange={(e) => {
                                                const newAgeGroups = modifiedAgeGroups.map((modifiedAgeGroup) => {
                                                    if (modifiedAgeGroup.id === ageGroup.id) {
                                                        return {
                                                            ...modifiedAgeGroup,
                                                            displayName: e.target.value,
                                                        };
                                                    }
                                                    return modifiedAgeGroup;
                                                });
                                                setModifiedAgeGroups(newAgeGroups);
                                            }}
                                            fullWidth
                                        />
                                        <div>
                                            {isChanged ? 
                                                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500 animate-ping" /> : 
                                                <TrashIcon 
                                                    className="w-6 h-6 text-red-500 hover:cursor-pointer hover:text-red-800"
                                                    onClick={() => setDeletePopupId(ageGroup.id)}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                
                {deletePopupId !== "" ? (
                    deletePopup()
                ) : null}

                <div className="w-2/3 pt-2 flex items-center justify-center">
                    <Button size="large" variant="contained" color="primary" onClick={addAgeGroup} >Add Age Group</Button>
                </div>

                <div className="w-1/2 pt-8">
                    <FormCancelSave 
                        onCancelClick={() => cancel()} 
                        onSaveClick={() => handleSave()}
                        saveButtonDisabled={ageGroups === modifiedAgeGroups}
                        cancelButtonDisabled={ageGroups === modifiedAgeGroups}
                    />
                </div>
            </div>
        </PageContainer>
    );
}

export default AgeGroups;