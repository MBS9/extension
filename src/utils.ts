import { Options, DataFormat } from "./types";
import { optionsKeys } from "./options";

export async function start(tab: chrome.tabs.Tab) {
  const data = (await chrome.storage.sync.get()) as DataFormat;
  const options = data[Options.OPTIONS] ?? {};
  const files = [];
  for (const key of optionsKeys) {
    if (options[key] || options[key] === undefined) {
      files.push(`${key}.bundle.js`);
    }
  }
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: Options.ON,
  });
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: files,
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

export function getDomain(url: string) {
  return new URL(url).hostname;
}
