import { DataFormat, Options } from "./types";
import { start, getTab, getDomain } from "./utils";

const buttonAuto = document.getElementById("buttonAuto") as HTMLButtonElement;
const buttonNow = document.getElementById("buttonNow") as HTMLButtonElement;
const buttonStop = document.getElementById("buttonStop") as HTMLButtonElement;
const buttonHere = document.getElementById("buttonHere") as HTMLButtonElement;
const buttonNotHere = document.getElementById(
  "buttonNotHere"
) as HTMLButtonElement;

buttonHere.addEventListener("click", async () => {
  const data = (await chrome.storage.sync.get()) as DataFormat;
  const tab = await getTab();
  const exceptions: string[] = data[Options.EXCEPTIONS] ?? [];
  const index = exceptions.indexOf(getDomain(tab.url));
  if (index !== -1) {
    exceptions.splice(index, 1);
    data[Options.EXCEPTIONS] = exceptions;
    await chrome.storage.sync.set(data);
  }
});

buttonAuto.addEventListener("click", async () => {
  const data = (await chrome.storage.sync.get()) as DataFormat;
  data[Options.AUTO_START] = true;
  await chrome.storage.sync.set(data);
  await start(await getTab());
});

buttonNow.addEventListener("click", async () => {
  await start(await getTab());
});

buttonStop.addEventListener("click", async () => {
  const data = (await chrome.storage.sync.get()) as DataFormat;
  data[Options.AUTO_START] = false;
  await chrome.storage.sync.set(data);
});

buttonNotHere.addEventListener("click", async () => {
  const data = (await chrome.storage.sync.get()) as DataFormat;
  const tab = await getTab();
  const exceptions: string[] = data[Options.EXCEPTIONS] ?? [];
  if (exceptions.indexOf(getDomain(tab.url)) === -1) {
    exceptions.push(getDomain(tab.url));
  }
  data[Options.EXCEPTIONS] = exceptions;
  await chrome.storage.sync.set(data);
});
