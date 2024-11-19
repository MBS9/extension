export enum Options {
  AUTO_START = "autoStart",
  ON = "ON",
  OFF = "OFF",
  EXCEPTIONS = "exceptions",
  OPTIONS = "options",
}

export type DataFormat = {
  [Options.AUTO_START]?: boolean;
  [Options.EXCEPTIONS]?: string[];
  [Options.OPTIONS]?: { [key: string]: boolean };
};
