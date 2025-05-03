import { useState } from 'react';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';
import { Button } from '@mui/material';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Progress } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
    const [appVersion, setAppVersion] = useState('0');
    const [newUpdateVersion, setNewUpdateVersion] = useState('0');
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updateDownloaded, setUpdateDownloaded] = useState(false);
    const [releaseNotes, setReleaseNotes] = useState('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    window.electron.ipcRenderer.send('app_version');
    window.electron.ipcRenderer.on('app_version', (event, arg) => {
        window.electron.ipcRenderer.removeAllListeners('app_version');
        setAppVersion(arg.version);
        console.log(`Current version: ${arg.version}`);
    });

    window.electron.ipcRenderer.on('update_available', (event, updateInfo) => {
        window.electron.ipcRenderer.removeAllListeners('update_available');
        setUpdateAvailable(true);
        setDialogOpen(true);
        setNewUpdateVersion(updateInfo.version);
        setReleaseNotes(updateInfo.releaseNotes);
        console.info('New update available:');
        console.info(updateInfo);
    });

    window.electron.ipcRenderer.on('update_downloaded', () => {
        window.electron.ipcRenderer.removeAllListeners('update_downloaded');
        setUpdateDownloaded(true);
        console.info('Update downloaded');
    });

    window.electron.ipcRenderer.on('download_progress', (event, progressObj) => {
        setDownloadProgress(progressObj.percent.toFixed(0));
        console.log(progressObj.percent.toFixed(0));
    })
    const upda = () => {
        setDialogOpen(false);
    }

    const updateDialog = () => {
        return (
            <div className="pt-4">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-center">
                        <div className='absolute bg-red-200 rounded-md hover:bg-red-400 hover:cursor-pointer'>
                            <XMarkIcon onClick={upda} className='w-6 h-6'/>
                        </div>
                        <h2 className="text-xl font-semibold mb-4">
                            Update available!
                        </h2>
                        <p className="text-gray-600">
                            Current version {`-->`}{' '}
                            {appVersion}
                        </p>
                        <p className="text-gray-600 pt-1">
                            New version {`-->`}{' '}
                            {newUpdateVersion === '0'
                                ? '?'
                                : newUpdateVersion}
                        </p>
                        {/* <p>
                            <span className="font-semibold">
                                Release notes:{' '}
                            </span>
                            {releaseNotes === ''
                                ? 'No release notes available'
                                : releaseNotes}
                        </p> */}

                        {!updateDownloaded ? (
                            <div className="font-bold flex-row justify-center pt-4 gap-2">
                                <h3 className='text-sm pb-2'>Download progress</h3>
                                <Progress value={downloadProgress} color="orange"/>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600 pt-4 mb-4">
                                    Update downloaded.
                                    Would you like to
                                    update now?
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                        Cancel
                                    </button>
                                    <button
                                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        onClick={() => {
                                            window.electron.ipcRenderer.send(
                                                'restart_app',
                                            );
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <PageContainer>
            <div>
                <PageTitle text="NSBL Mangement app" />

                <div className="w-full h-full flex flex-col gap-2 pt-6">
                    <div className="w-full h-1/5 mb-20 pb-10 relative">
                        {/* <span className="text-lg font-semibold">Your Courses</span>
						<hr className="w-[125px]"></hr> */}
                        <div className="absolute w-full ">
                            <div className="overflow-x-auto gap-6 pt-4 pb-4 min-width-max pr-[200px]">
                                <p className="font-bold text-xl">
                                    Version {appVersion}
                                </p>
                                <p className="font-semibold text-md pb-8">
                                    You are running on the amazing edge of
                                    technology!
                                </p>
                                {/* <Button variant='contained' onClick={() => setDialogOpen(true)}>
                                    Check for Updates
                                </Button> */}
                                {dialogOpen ? updateDialog() : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Dashboard;
