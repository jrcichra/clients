import { ipcRenderer } from "electron";

import { DeviceType, ThemeType } from "@bitwarden/common/enums";

import { BiometricMessage, BiometricStorageAction } from "../types/biometric-message";
import { isDev, isWindowsStore } from "../utils";

import { ClipboardWriteMessage } from "./types/clipboard";

const biometric = {
  osSupported: (): Promise<boolean> =>
    ipcRenderer.invoke("biometric", {
      action: BiometricStorageAction.OsSupported,
    } satisfies BiometricMessage),
  authenticate: (): Promise<boolean> =>
    ipcRenderer.invoke("biometric", {
      action: BiometricStorageAction.Authenticate,
    } satisfies BiometricMessage),
};

export default {
  versions: {
    app: (): Promise<string> => ipcRenderer.invoke("appVersion"),
  },
  deviceType: deviceType(),
  isDev: isDev(),
  isWindowsStore: isWindowsStore(),
  reloadProcess: () => ipcRenderer.send("reload-process"),

  getSystemTheme: (): Promise<ThemeType> => ipcRenderer.invoke("systemTheme"),
  onSystemThemeUpdated: (callback: (theme: ThemeType) => void) => {
    ipcRenderer.on("systemThemeUpdated", (_event, theme: ThemeType) => callback(theme));
  },

  clipboardRead: (): Promise<string> => ipcRenderer.invoke("clipboard.read"),
  clipboardWrite: (message: ClipboardWriteMessage) =>
    ipcRenderer.invoke("clipboard.write", message),

  launchUri: (uri: string) => ipcRenderer.invoke("launchUri", uri),

  biometric,
};

function deviceType(): DeviceType {
  switch (process.platform) {
    case "win32":
      return DeviceType.WindowsDesktop;
    case "darwin":
      return DeviceType.MacOsDesktop;
    default:
      return DeviceType.LinuxDesktop;
  }
}
