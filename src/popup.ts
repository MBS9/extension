import { DataFormat, Options } from "./types";
import { start, getTab, getDomain } from "./utils";
import { optionsKeys } from "./options";

const buttonAuto = document.getElementById("buttonAuto") as HTMLButtonElement;
const buttonNow = document.getElementById("buttonNow") as HTMLButtonElement;
const buttonStop = document.getElementById("buttonStop") as HTMLButtonElement;
const buttonHere = document.getElementById("buttonHere") as HTMLButtonElement;
const buttonNotHere = document.getElementById(
  "buttonNotHere"
) as HTMLButtonElement;
const form = document.getElementById("options") as HTMLFormElement;

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = (await chrome.storage.sync.get()) as DataFormat;
  const dataFromForm = new FormData(form);
  const options = dataFromForm.entries();
  const optionsData: { [key: string]: boolean } = {};
  for (const key of optionsKeys) {
    optionsData[key] = false;
  }
  for (const [key, value] of options) {
    optionsData[key] = Boolean(value);
  }
  data[Options.OPTIONS] = optionsData;
  await chrome.storage.sync.set(data);
});

chrome.storage.sync.get().then((data) => {
  const options = data[Options.OPTIONS] as DataFormat[Options.OPTIONS];
  if (options) {
    for (const [key, value] of Object.entries(options)) {
      const element = document.getElementById(key) as HTMLInputElement;
      element.checked = value;
    }
  }
});
