import {readRuntimeJSON, writeRuntimeJSON} from "./file.js";

export interface CameraCrop {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const isCameraCrop = (obj: unknown): obj is CameraCrop => {
  const rec = obj as Record<string, unknown>;
  return ("left" in rec && (typeof rec.left === "number"))
    && ("right" in rec && (typeof rec.right === "number"))
    && ("top" in rec && (typeof rec.top === "number"))
    && ("bottom" in rec && (typeof rec.bottom === "number"));
};

export interface Config {
  cameraCrop: CameraCrop;
}

export const isConfig = (obj: unknown): obj is Config => {
  const rec = obj as Record<string, unknown>;
  return ("cameraCrop" in rec && isCameraCrop(rec.cameraCrop));
};

export type ConfigOptional = Partial<Config>;

export const isConfigOptional = (obj: unknown): obj is ConfigOptional => {
  const rec = obj as Record<string, unknown>;
  return (!("cameraCrop" in rec) || isCameraCrop(rec.cameraCrop));
};

const configFilename = "config.json";

/** Read configuration from config file */
export const readConfig = async (): Promise<Config> => {
  const defaultConfig: Config = {
    cameraCrop: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };
  const fileConfig = await readRuntimeJSON<ConfigOptional>(configFilename, isConfigOptional);
  return {
    ...defaultConfig,
    ...fileConfig,
  };
};

/** Write configuration to config file */
export const writeConfig = async (config: ConfigOptional): Promise<void> => {
  const fileConfig = await readConfig();
  const fullConfig = {
    ...fileConfig,
    ...config,
  };
  await writeRuntimeJSON(configFilename, fullConfig);
};
