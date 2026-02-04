import { DataFormat } from "./types";
import { start, getDomain } from "./utils";

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const data = (await chrome.storage.sync.get()) as DataFormat;
    if (
      data["autoStart"] === true &&
      !(data["exceptions"]?.includes(getDomain(tab.url)) ?? false)
    ) {
      await start(tab);
    } else {
      await chrome.action.setBadgeText({
        text: "OFF",
      });
    }
  }
});
