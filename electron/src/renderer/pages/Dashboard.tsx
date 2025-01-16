import { useState } from 'react';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';
import { Button } from '@mui/material';

const Dashboard = () => {
    const [appVersion, setAppVersion] = useState('0.1.1');
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updateDownloaded, setUpdateDownloaded] = useState(false);

    window.electron.ipcRenderer.on('update_available', () => {
        window.electron.ipcRenderer.removeAllListeners('update_available');
        setUpdateAvailable(true);
        console.log('update_available');
    });

    window.electron.ipcRenderer.on('update_downloaded', () => {
        window.electron.ipcRenderer.removeAllListeners('update_downloaded');
        setUpdateDownloaded(true);
        console.log('update_downloaded');
    });

    return (
        <PageContainer>
            <div>
                <PageTitle text="NSBL Mangement app" />

                <div className="w-full h-full flex flex-col gap-2 pt-6">
                    <div className="w-full h-1/5 mb-20 pb-10 relative">
                        {/* <span className="text-lg font-semibold">Your Courses</span>
						<hr className="w-[125px]"></hr> */}
                        <div className="absolute w-full ">
                            <div className="overflow-x-auto flex gap-6 pt-4 pb-4 min-width-max pr-[200px]">
                                <p className='font-bold text-lg'>Version {appVersion}</p>
                                {updateAvailable ? (<p>Update availalbe!</p>) : null}
                                {updateDownloaded ? (
                                    <div>
                                        <p>Update downloaded!</p>
                                        <Button
                                            onClick={() => {
                                                window.electron.ipcRenderer.send('restart_app');
                                            }}
                                        >
                                            Restart now?
                                        </Button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Dashboard;
