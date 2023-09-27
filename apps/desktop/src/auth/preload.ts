import { ipcRenderer } from "electron";

export default {
  getHcaptchaAccesibilityCookie: (): Promise<[string]> =>
    ipcRenderer.invoke("getCookie", { url: "https://www.hcaptcha.com/", name: "hc_accessibility" }),
};
