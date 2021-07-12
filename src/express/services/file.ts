import {
  mkdir,
  readFile,
  writeFile,
} from "fs/promises";
import {existsSync} from "fs";
import {
  join,
  resolve,
  dirname,
  relative,
  sep,
} from "path";
import {fileURLToPath} from "url";
import {TypePredicate} from "./types.js";

/** Absolute path to project root */
const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
);

/** Absolute path to runtime directory */
const runtimeDir = resolve(projectRoot, "runtime");

export type PathSegments = Array<string> | string;

/** Convert an array of path segments to a single string */
export const segmentsToPath = (path: PathSegments): string => {
  if (Array.isArray(path)) {
    return join(...path);
  }
  return path;
};

/** Return the path to a file in the runtime directory */
export const pathRuntime = (path: PathSegments): string => {
  const result = resolve(
    runtimeDir,
    segmentsToPath(path),
  );
  const relativeToParent = relative(runtimeDir, result);
  if (relativeToParent && (relativeToParent === ".." || relativeToParent.startsWith(`..${sep}`))) {
    throw new Error("Cannot escape runtime directory");
  }
  return result;
};

/** Read the content of a text file in the runtime directory */
export const readRuntimeText = async (
  path: PathSegments,
  failIfMissing = false,
): Promise<string | undefined> => {
  const filepath = pathRuntime(path);
  if (existsSync(filepath)) {
    return readFile(filepath, "utf8");
  }
  if (failIfMissing) throw new Error(`Missing file ${path.toString()}`);
};

/** Read the content of a JSON file in the runtime directory */
export const readRuntimeJSON = async <ResType>(
  path: PathSegments,
  predicate: TypePredicate<ResType>,
  failIfMissing = false,
): Promise<ResType | undefined> => {
  const data = await readRuntimeText(path, failIfMissing);
  if (data === undefined) return;
  const parsed = JSON.parse(data) as unknown;
  if (!predicate(parsed)) throw new Error("Invalid data type");
  return parsed;
};

/** Write a file in the runtime directory */
export const writeRuntime = async (
  path: PathSegments,
  data: string | Uint8Array,
): Promise<void> => {
  const filepath = pathRuntime(path);
  const filedir = dirname(filepath);
  await mkdir(filedir, {recursive: true});
  await writeFile(filepath, data);
};

/** Write a JSON file in the runtime directory */
export const writeRuntimeJSON = (
  path: PathSegments,
  data: unknown,
): Promise<void> => writeRuntime(path, JSON.stringify(data));
