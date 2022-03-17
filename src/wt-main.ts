import "./main.less";

import { Plugin } from "obsidian";

import {
  WidgetTestSettings,
  WidgetTestSettingTab,
  DEFAULT_SETTINGS,
} from "./settings";

export default class WidgetTest extends Plugin {
  settings: WidgetTestSettings = DEFAULT_SETTINGS;

  async onload() {
    console.log("loading Widget test");

    await this.loadSettings();

    this.addSettingTab(new WidgetTestSettingTab(this));
  }

  onunload() {
    // console.log("unloading Widget test");
  }

  async loadSettings() {
    this.settings = { ...this.settings, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
