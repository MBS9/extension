import { DataFormat, Options } from "./types";
import { start, getDomain } from "./utils";

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.setBadgeText({
    text: Options.OFF,
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const data = (await chrome.storage.sync.get()) as DataFormat;
    console.log(data);
    if (
      data[Options.AUTO_START] === true &&
      (data[Options.EXCEPTIONS]?.findIndex((v) => v === getDomain(tab.url)) ??
        -1) === -1
    ) {
      await start(tab);
    } else {
      await chrome.action.setBadgeText({
        text: Options.OFF,
      });
    }
  }
});
