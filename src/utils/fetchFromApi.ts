import { stringifyQueryParams } from "./stringifyQueryParams";
import { isEmpty } from "./isEmpty";
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
  queryParamsByName,
  body,
}: {
  endpoint: string;
  method: HttpMethod;
  config: Config;
  queryParamsByName?: object;
  body?: unknown;
}): Promise<TypedResponse<T>> {
  const { backoffTime = 3000, maxRetryAttempts = 5 } = config;

  // Build the configuration object for sending the request.
  const fetchConfig = { method } as Record<string, string | FormData | object>;
  const fetchBody = await getFetchBody(config, queryParamsByName, body);
  if (fetchBody !== null) {
    fetchConfig.body = fetchBody;
  }

  const apiUrl = buildApiUrl(endpoint, config, queryParamsByName);

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
    if (response.status === 429) {
      if (attemptsRemaining === 0) {
        throw new Error(
          "Maximum retry attempts reached, try increasing the `backoffTime` or `maxRetryAttempts`",
        );
      }

      await pause(backoffTime);
      return await fetchWithRetries(
        apiUrl,
        fetchConfig,
        backoffTime,
        attemptsRemaining - 1,
      );
    }

    throw new Error(response.statusText);
  }

  return response;
}

/**
 * Constructs the endpoint for performing the API request.
 */
function buildApiUrl(
  endpoint: string,
  config: Config,
  queryParamsByName?: object,
): string {
  const validParamsByName = {
    ...(queryParamsByName ?? {}),
    key: config.key,
    token: config.token,
  } as Record<string, string>;

  // We don't want to attempt to stringify the "file" query param:
  if ("file" in validParamsByName) {
    delete validParamsByName.file;

    // The "name" and "mimeType" will be in the FormData body of the request:
    if ("name" in validParamsByName) {
      delete validParamsByName.name;
    }

    if ("mimeType" in validParamsByName) {
      delete validParamsByName.mimeType;
    }
  }
  const queryString = stringifyQueryParams(validParamsByName);

  // Remove any duplicate `/` values. We're omitting the `https://` from the
  // URL to ensure the `//` doesn't get removed:
  const validUrl = sanitizeUrl(`api.trello.com/1/${endpoint}`);
  return `https://${validUrl}?${queryString}`;
}

function sanitizeUrl(url: string): string {
  return url.replace(/\/+/g, "/").replace(/\/+$/, "");
}

/**
 * Returns the `body` for the fetch config object.
 */
async function getFetchBody(
  config: Config,
  queryParamsByName?: object,
  body?: unknown,
): Promise<FormData | string | null | object> {
  if (!isEmpty(queryParamsByName)) {
    const validParamsByName = queryParamsByName as Record<string, string>;

    if ("file" in validParamsByName) {
      if (typeof FormData === "undefined") {
        const { default: FormData } = await import("form-data");
        const formData = new FormData();
        return appendDataToForm(formData, config, validParamsByName);
      } else {
        const formData = new FormData();
        return appendDataToForm(formData, config, validParamsByName);
      }
    }
  }

  if (!isEmpty(body)) {
    return JSON.stringify(body);
  }

  return null;
}

function appendDataToForm(
  formData: unknown,
  config: Config,
  paramsByName: Record<string, string>,
): FormData {
  const validFormData = formData as FormData;
  validFormData.append("key", config.key);
  validFormData.append("token", config.token);
  validFormData.append("file", paramsByName.file);

  if ("name" in paramsByName) {
    validFormData.append("name", paramsByName.name);
  }

  if ("mimeType" in paramsByName) {
    validFormData.append("mimeType", paramsByName.mimeType);
  }

  return validFormData;
}

/**
 * Pauses execution for the specified duration (in milliseconds).
 */
function pause(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}
