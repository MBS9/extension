export enum Options {
  AUTO_START = "autoStart",
  ON = "ON",
  OFF = "OFF",
  EXCEPTIONS = "exceptions",
}

export type DataFormat = {
  [Options.AUTO_START]?: boolean;
  [Options.EXCEPTIONS]?: string[];
};
