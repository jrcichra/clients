import { ipcRenderer } from "electron";

import { DeviceType, ThemeType, KeySuffixOptions } from "@bitwarden/common/enums";

import { BiometricMessage, BiometricStorageAction } from "../types/biometric-message";
import { isDev, isWindowsStore } from "../utils";

const biometric = {
  enabled: (userId: string): Promise<boolean> =>
    ipcRenderer.invoke("biometric", {
      action: BiometricStorageAction.EnabledForUser,
      key: `${userId}_user_biometric`,
      keySuffix: KeySuffixOptions.Biometric,
      userId: userId,
    } satisfies BiometricMessage),

  osSupported: (): Promise<boolean> =>
    ipcRenderer.invoke("biometric", {
      action: BiometricStorageAction.OsSupported,
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

  isWindowVisible: (): Promise<boolean> => ipcRenderer.invoke("windowVisible"),
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
