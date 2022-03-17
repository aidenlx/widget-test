import { PluginSettingTab, Setting } from "obsidian";

import WidgetTest from "./wt-main";

export interface WidgetTestSettings {}

export const DEFAULT_SETTINGS: WidgetTestSettings = {};

export class WidgetTestSettingTab extends PluginSettingTab {

  constructor(public plugin: WidgetTest) {
    super(plugin.app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
  }
}
