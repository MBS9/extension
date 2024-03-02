import { Options } from "./types";

export async function start(tab: chrome.tabs.Tab) {
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: Options.ON,
  });
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["set_style.bundle.js"],
    });
  } catch (e) {
    console.log("Error: ", e);
  }
}

export async function getTab() {
  return (
    await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
      currentWindow: true,
    })
  )[0];
}
