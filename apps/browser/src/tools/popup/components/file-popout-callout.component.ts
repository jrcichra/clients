import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import { PlatformUtilsService } from "@bitwarden/common/platform/abstractions/platform-utils.service";
import { CalloutModule } from "@bitwarden/components";

import { PopupUtilsService } from "../../../popup/services/popup-utils.service";

@Component({
  selector: "tools-file-popout-callout",
  templateUrl: "file-popout-callout.component.html",
  standalone: true,
  imports: [CommonModule, JslibModule, CalloutModule],
})
export class FilePopoutCalloutComponent implements OnInit {
  isSafari = false;
  isFirefox = false;
  inPopout = false;
  inSidebar = false;
  isLinux = false;
  isUnsupportedMac = false;

  constructor(
    private platformUtilsService: PlatformUtilsService,
    private popupUtilsService: PopupUtilsService
  ) {}

  async ngOnInit() {
    // File visibility
    this.isSafari = this.platformUtilsService.isSafari();
    this.isFirefox = this.platformUtilsService.isFirefox();
    this.inPopout = this.popupUtilsService.inPopout(window);
    this.inSidebar = this.popupUtilsService.inSidebar(window);
    this.isLinux = window?.navigator?.userAgent.indexOf("Linux") !== -1;
    this.isUnsupportedMac =
      this.platformUtilsService.isChrome() && window?.navigator?.appVersion.includes("Mac OS X 11");
  }

  get showFilePopoutMessage(): boolean {
    return (
      this.showFirefoxFileWarning || this.showSafariFileWarning || this.showChromiumFileWarning
    );
  }

  get showFirefoxFileWarning(): boolean {
    return this.isFirefox && !(this.inSidebar || this.inPopout);
  }

  get showSafariFileWarning(): boolean {
    return this.isSafari && !this.inPopout;
  }

  // Only show this for Chromium based browsers in Linux and Mac > Big Sur
  get showChromiumFileWarning(): boolean {
    return (
      (this.isLinux || this.isUnsupportedMac) &&
      !this.isFirefox &&
      !(this.inSidebar || this.inPopout)
    );
  }

  popOutWindow() {
    this.popupUtilsService.popOut(window);
  }
}
