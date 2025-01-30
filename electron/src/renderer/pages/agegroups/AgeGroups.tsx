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
    console.log(ageGroups);

    const cancel = () => {
        setModifiedAgeGroups(ageGroups);
    }

    const addAgeGroup = () => {
        const newAgeGroup = {
            id: 'new',
            displayName: '',
        };
        setModifiedAgeGroups([...modifiedAgeGroups, newAgeGroup]);
    }

    const handleSave = () => {
        console.log('same lengths');
        ageGroups.forEach((ageGroup) => {
            const modifiedAgeGroup = modifiedAgeGroups.find(group => group.id === ageGroup.id);
            if (modifiedAgeGroup && modifiedAgeGroup.displayName !== ageGroup.displayName) {
                console.log(`ageGroup ${ageGroup.displayName} has been modified to ${modifiedAgeGroup.displayName}`);
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
                }
                window.electron.ipcRenderer
                    .invoke(IpcChannels.PrismaClient, prismaCall)
                    .then((data) => {
                        console.log("updated data!!!:");
                        console.log(data);
                        // update ageGroups state to include the modified ageGroup
                        const updatedAgeGroups = ageGroups.map((group) => {
                            if (group.id === ageGroup.id) {
                                return {
                                    ...group,
                                    displayName: modifiedAgeGroup.displayName,
                                };
                            }
                            return group;
                        });
                        setAgeGroups(updatedAgeGroups);
                        setModifiedAgeGroups(updatedAgeGroups);
                        if (getAgeGroups) {
                            getAgeGroups();
                        }
                        toast.success(`${modifiedAgeGroup.displayName} updated!`);
                    });
            }
        });
        // add new age groups
        const newAgeGroups = modifiedAgeGroups.filter(group => group.id === 'new');
        newAgeGroups.forEach((newAgeGroup) => {
            console.log(`adding new age group ${newAgeGroup.displayName}`);
            const prismaCall: PrismaCall = {
                model: ModelName.ageGroup,
                operation: CrudOperations.create,
                data: {
                    data: {
                        displayName: newAgeGroup.displayName,
                    },
                },
            }
            window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, prismaCall)
                .then((data) => {
                    console.log("created data!!!:");
                    console.log(data);
                    // update ageGroups state to include the modified ageGroup
                    const updatedAgeGroups = [...ageGroups, data as AgeGroupDataResponse];
                    setAgeGroups(updatedAgeGroups);
                    setModifiedAgeGroups(updatedAgeGroups);
                    if (getAgeGroups) {
                        getAgeGroups();
                    }
                    toast.success(`${newAgeGroup.displayName} added!`);
                });
        });
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
                                    {ageGroup.id !== 'new' ? (
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
                                                <TrashIcon className="w-6 h-6 text-red-500 hover:cursor-pointer hover:text-red-800" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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