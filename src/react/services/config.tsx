import {getConfig, setConfig} from "../../sdk/config.js";
import {Config} from "../../shared/types.js";

export const get = (): Promise<Config> => getConfig();
export const set = (config: Config): Promise<void> => setConfig(config);
