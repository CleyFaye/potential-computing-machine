import axios, {AxiosResponse, Method} from "axios";

const makeUrl = (
  route: string,
  queryParams?: Record<string, string>,
) => {
  const urlSearchParams = new URLSearchParams(queryParams);
  const searchString = urlSearchParams.toString();
  if (searchString) {
    return `${route}?${searchString}`;
  }
  return route;
};

export const callRemote = <ResType>(
  method: Method,
  route: string,
  queryParams?: Record<string, string>,
  bodyData?: unknown,
): Promise<ResType> => {
  const a = 12;
  return axios(
    makeUrl(route, queryParams),
    {
      method,
      data: bodyData,
      validateStatus: () => true,
    },
  ).then(
    (result: AxiosResponse<ResType>) => result.data,
  );
};

export const get = <ResType>(
  route: string,
  queryParams?: Record<string, string>,
): Promise<ResType> => callRemote("get", route, queryParams, undefined);

export const post = <ResType>(
  route: string,
  bodyData: unknown,
  queryParams?: Record<string, string>,
): Promise<ResType> => callRemote("post", route, queryParams, bodyData);
