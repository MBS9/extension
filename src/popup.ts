import { DataFormat, Options } from "./types";
import { start, getTab } from "./utils";

const buttonAuto = document.getElementById("buttonAuto") as HTMLButtonElement;
const buttonNow = document.getElementById("buttonNow") as HTMLButtonElement;
const buttonStop = document.getElementById("buttonStop") as HTMLButtonElement;
const buttonNotHere = document.getElementById(
  "buttonNotHere"
) as HTMLButtonElement;

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
  exceptions.push(tab.url);
  data[Options.EXCEPTIONS] = exceptions;
  await chrome.storage.sync.set(data);
  console.log(data);
});
