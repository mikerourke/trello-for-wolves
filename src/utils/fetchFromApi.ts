import { stringifyQueryParams } from "./stringifyQueryParams";
import { Config, TypedResponse } from "../typeDefs";

export type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

/**
 * Returns a resolved Promise with the results of the Trello API call.
 * @private
 */
export async function fetchFromApi<T>({
  endpoint,
  method,
  config,
  queryParamsByName = {},
  body = null,
}: {
  endpoint: string;
  method: HttpMethod;
  config: Config;
  queryParamsByName?: object;
  body?: unknown | null;
}): Promise<TypedResponse<T>> {
  const { backoffTime = 3000, maxRetryAttempts = 5, key, token } = config;

  const apiUrl = buildApiUrl(endpoint, queryParamsByName, key, token);

  // Build the configuration object for sending the request.
  const fetchConfig = { method } as Record<string, string | FormData>;
  const fetchBody = getFetchBody(queryParamsByName, body);
  if (fetchBody !== null) {
    fetchConfig.body = fetchBody;
  }

  return await fetchWithRetries(
    apiUrl,
    fetchConfig,
    backoffTime,
    maxRetryAttempts,
  );
}

async function fetchWithRetries<T>(
  apiUrl: string,
  fetchConfig: object,
  backoffTime: number,
  attemptsRemaining: number,
): Promise<TypedResponse<T>> {
  const response = await fetch(apiUrl, fetchConfig);
  if (!response.ok) {
    if (attemptsRemaining === 0) {
      // TODO: Change this to throw a custom error.
      throw new Error("I'm an error");
    }

    if (response.status === 429) {
      await pause(backoffTime);
      return await fetchWithRetries(
        apiUrl,
        fetchConfig,
        backoffTime,
        attemptsRemaining - 1,
      );
    }
  }

  return response;
}

/**
 * Constructs the endpoint for performing the API request.
 */
function buildApiUrl(
  endpoint: string,
  queryParamsByName: object,
  apiKey: string,
  apiToken: string,
): string {
  // Ensure there are no double or trailing slashes:
  const sanitizedUrl = endpoint.replace(/\/+/g, "/").replace(/\/+$/, "");

  const validParamsByName = {
    ...queryParamsByName,
    key: apiKey,
    token: apiToken,
  } as object & { file?: unknown };

  // We don't want to attempt to stringify the "file" query param:
  if ("file" in validParamsByName) {
    delete validParamsByName.file;
  }
  const queryString = stringifyQueryParams(validParamsByName);

  return "https://api.trello.com/1/".concat(sanitizedUrl, "?", queryString);
}

/**
 * Returns the `body` for the fetch config object.
 */
function getFetchBody(
  queryParamsByName: object,
  body?: unknown | null,
): FormData | string | null {
  const validParamsByName = queryParamsByName as Record<string, string>;
  if ("file" in validParamsByName) {
    const formData = new FormData();
    formData.append("file", validParamsByName.file);
    formData.append("name", validParamsByName?.name ?? "file");

    if ("mimeType" in validParamsByName) {
      formData.append("mimeType", validParamsByName.mimeType);
    }

    return formData;
  }

  if (body !== null) {
    return JSON.stringify(body);
  }

  return null;
}

/**
 * Pauses execution for the specified duration (in milliseconds).
 */
function pause(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}