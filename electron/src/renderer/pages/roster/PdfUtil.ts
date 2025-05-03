import { toast } from 'react-toastify';
import { IpcChannels } from '../../../general/IpcChannels';

export const downloadRunsheet = async (gameId: string) => {
    const defaultFileName = `scoresheet-${gameId}.pdf`;

    const toastId = toast.loading('Downloading PDF...');
    try {
        const result = await window.electron.ipcRenderer.invoke(
            IpcChannels.SavePDF,
            {
                gameId,
                defaultFileName,
            },
        );
        console.log('result:');
        console.log(result);
        if (result.success) {
            toast.update(toastId, {
                render: `PDF saved successfully at ${result.filePath}`,
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
        } else {
            toast.update(toastId, {
                render: `Error: ${result.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    } catch (error) {
        console.error('Error saving PDF:');
        console.error(error);
        toast.update(toastId, {
            render: `An error occurred while saving the ZIP: ${
                (error as Error).message
            }`,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
        });
    }
};

export const downloadMultipleRunsheets = async (gameIds: string[], date: Date) => {
    const defaultFileName = `Scoresheets-${date.toISOString().split('T')[0]}.pdf`;
    console.log(`downloading ${gameIds.length} scoresheets:`);
    console.log(gameIds);

    const toastId = toast.loading('Downloading PDF...');
    try {
        const result = await window.electron.ipcRenderer.invoke(
            IpcChannels.SaveZIP,
            {
                gameIds,
                defaultFileName,
            },
        );
        if (result.success) {
            toast.update(toastId, {
                render: `PDF saved successfully at ${result.filePath}`,
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
        } else {
            toast.update(toastId, {
                render: `Error: ${result.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    } catch (error) {
        console.error('Error saving PDF:');
        console.error(error);
        toast.update(toastId, {
            render: `An error occurred while saving the PDF: ${
                (error as Error).message
            }`,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
        });
    }
};
