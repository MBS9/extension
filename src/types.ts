import { optionsKeys } from './options';

export type OptionKey = 'fonts' | 'colors' | 'spacing' | 'sizes' | 'autoplay';

export type DataFormat = {
  autoStart?: boolean;
  exceptions?: string[];
  options?: Record<OptionKey, boolean>;
};
