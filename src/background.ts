chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: "ON",
  });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["set_style.js"],
  });
});
