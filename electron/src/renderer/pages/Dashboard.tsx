import { useState } from 'react';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';
import { Button } from '@mui/material';

const Dashboard = () => {
    const [appVersion, setAppVersion] = useState('0');
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updateDownloaded, setUpdateDownloaded] = useState(false);

    window.electron.ipcRenderer.send('app_version');
    window.electron.ipcRenderer.on('app_version', (event, arg) => {
        window.electron.ipcRenderer.removeAllListeners('app_version');
        setAppVersion(arg.version);
        console.log('app_version', arg.version);
    });

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
                                <p>dolphin</p>
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
                                <Button
                                            onClick={() => {
                                                window.electron.ipcRenderer.send('restart_app');
                                            }}
                                        >
                                            Restart now2?
                                        </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Dashboard;
