// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

export type Channels = string;

const electronHandler = {
    ipcRenderer,
    // ipcRenderer: {
    //     sendMessage(channel: Channels, ...args: unknown[]) {
    //         ipcRenderer.send(channel, ...args);
    //     },
    //     on(channel: Channels, func: (...args: unknown[]) => void) {
    //         const subscription = (
    //             _event: IpcRendererEvent,
    //             ...args: unknown[]
    //         ) => func(...args);
    //         ipcRenderer.on(channel, subscription);

    //         return () => {
    //             ipcRenderer.removeListener(channel, subscription);
    //         };
    //     },
    //     once(channel: Channels, func: (...args: unknown[]) => void) {
    //         ipcRenderer.once(channel, (_event, ...args) => func(...args));
    //     },

    // },
};

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
        on: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.on(channel, listener),
        removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
        invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args)
    }
});

// contextBridge.exposeInMainWorld('electron', { ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on, send: ipcRenderer.send } });

export type ElectronHandler = typeof electronHandler;
