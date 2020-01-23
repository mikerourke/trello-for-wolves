import fetch from "cross-fetch";
import {
  QueryParamsByName,
  stringifyQueryParams,
} from "./stringifyQueryParams";
import { Config } from "../typeDefs";

export type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

export { QueryParamsByName } from "./stringifyQueryParams";

/**
 * Returns a resolved Promise with the results of the Trello API call.
 * @private
 */
export async function fetchFromApi({
  endpoint,
  method,
  config,
  queryParamsByName = {},
  body = null,
}: {
  endpoint: string;
  method: HttpMethod;
  config: Config;
  queryParamsByName?: QueryParamsByName;
  body?: unknown | null;
}): Promise<unknown> {
  const { backoffTime = 3000, maxRetryAttempts = 5, key, token } = config;

  const apiUrl = buildApiUrl(endpoint, queryParamsByName, key, token);

  // Build the configuration object for sending the request.
  const fetchConfig = { method } as Record<string, string>;
  if (body !== null) {
    fetchConfig.body = JSON.stringify(body);
  }

  const fetchWithRetries = async (
    attemptsRemaining: number,
  ): Promise<unknown> => {
    const response = await fetch(apiUrl, fetchConfig);
    if (!response.ok) {
      if (attemptsRemaining === 0) {
        // TODO: Change this to throw a custom error.
        throw new Error("I'm an error");
      }

      if (response.status === 429) {
        await pause(backoffTime);
        return await fetchWithRetries(attemptsRemaining - 1);
      }
    }

    return response;
  };

  return await fetchWithRetries(maxRetryAttempts);
}

/**
 * Constructs the endpoint for performing the API request.
 */
function buildApiUrl(
  endpoint: string,
  queryParamsByName: QueryParamsByName,
  apiKey: string,
  apiToken: string,
): string {
  const apiUrl = `https://api.trello.com/1${endpoint}`;

  // Ensure there are no double or trailing slashes:
  const sanitizedUrl = apiUrl.replace(/\/+/g, "/").replace(/\/+$/, "");

  const validParamsByName = {
    ...queryParamsByName,
    key: apiKey,
    token: apiToken,
  } as QueryParamsByName;

  // We don't want to attempt to stringify the "file" query param:
  if ("file" in validParamsByName) {
    delete validParamsByName.file;
  }
  const queryString = stringifyQueryParams(validParamsByName);

  return sanitizedUrl.concat("?", queryString);
}

function pause(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}

// FIXME: This needs to be updated for the Fetch API.
// @ts-ignore
function getFetchConfig<TQueryParams>( // eslint-disable-line @typescript-eslint/no-unused-vars
  httpMethod: HttpMethod,
  requestUrl: string,
  queryParams: TQueryParams | {} = {},
): object {
  type RequestConfig = TQueryParams & {
    method: string;
    url: string;
    json: boolean;
    name?: string;
    file?: {
      readable: boolean;
    };
    mimeType?: string;
  };

  const requestConfig = {
    method: httpMethod,
    url: `https://${requestUrl}`,
  } as Partial<Request>;

  const validQueryParams = queryParams as any;

  if (validQueryParams?.file?.readable) {
    const fileName = validQueryParams?.name ?? "file";
    const formData = {
      name: fileName,
      file: validQueryParams?.file,
      mimeType: undefined,
    } as RequestConfig;

    if (validQueryParams.mimeType) {
      formData.mimeType = validQueryParams.mimeType;
    }

    (requestConfig as any).formData = formData;
  }

  return requestConfig;
}
