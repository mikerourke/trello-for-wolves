import { buildApiUrl } from "./buildApiUrl";
import { isEmpty } from "./isEmpty";
import { TrelloConfig, TypedResponse } from "../typeDefs";

export type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

/**
 * Returns a resolved Promise with the results of the Trello API call.
 * @private
 */
export async function fetchFromApi<TResponse>({
  endpoint,
  trelloConfig,
  fetchConfig = null,
  paramsByName = null,
}: {
  endpoint: string;
  trelloConfig: TrelloConfig;
  fetchConfig?: RequestInit | null;
  paramsByName?: Record<string, unknown> | null;
}): Promise<TypedResponse<TResponse>> {
  if (!trelloConfig.key) {
    throw new Error(
      `You must provide a "key" to the Trello instance config object`,
    );
  }

  if (!trelloConfig.token) {
    throw new Error(
      `You must provide a "token" to the Trello instance config object`,
    );
  }

  const { backoffTime = 3000, maxRetryAttempts = 5 } = trelloConfig;

  const validParamsByName = paramsByName === null ? {} : paramsByName;
  const validFetchConfig =
    fetchConfig === null ? { method: "GET" } : fetchConfig;

  validFetchConfig.body = getFetchBodyByEnvironment(
    trelloConfig,
    validFetchConfig.body ?? null,
    validParamsByName,
  );

  if ("file" in validParamsByName) {
    delete validParamsByName.file;
  }

  const apiUrl = buildApiUrl({
    endpoint,
    trelloConfig,
    paramsByName: validParamsByName,
  });

  return await fetchWithRetries(
    apiUrl,
    validFetchConfig,
    backoffTime,
    maxRetryAttempts,
  );
}

/**
 * Returns the `body` for the fetch trelloConfig object.
 */
function getFetchBodyByEnvironment(
  trelloConfig: TrelloConfig,
  body: BodyInit | null,
  paramsByName: Record<string, unknown>,
): BodyInit | null {
  // If the user stringifies the body when calling `makeApiRequest`, we don't
  // want to stringify it again:
  if (typeof body === "string") {
    return body;
  }

  if (!isEmpty(paramsByName) && "file" in paramsByName) {
    // We're working in the browser, so we should use FormData to send file
    // upload details:
    if (typeof window?.FormData !== "undefined") {
      const formData = new window.FormData();
      return appendDataToForm(formData, trelloConfig, paramsByName);
    }

    return paramsByName.file as BodyInit;
  }

  return JSON.stringify(body);
}

function appendDataToForm(
  formData: unknown,
  trelloConfig: TrelloConfig,
  paramsByName: Record<string, unknown>,
): FormData {
  const validFormData = formData as FormData;
  validFormData.append("key", trelloConfig.key);
  validFormData.append("token", trelloConfig.token);
  validFormData.append("file", paramsByName.file as Blob);

  if ("name" in paramsByName) {
    validFormData.append("name", paramsByName.name as string);
  }

  if ("mimeType" in paramsByName) {
    validFormData.append("mimeType", paramsByName.mimeType as string);
  }

  return validFormData;
}

async function fetchWithRetries<T>(
  apiUrl: string,
  fetchConfig: RequestInit,
  backoffTime: number,
  attemptsRemaining: number,
): Promise<TypedResponse<T>> {
  const response = await fetch(apiUrl, fetchConfig);
  if (response.ok) {
    return response;
  }

  if (response.status === 429) {
    if (attemptsRemaining === 0) {
      throw new Error(
        `Maximum retry attempts reached, try increasing the "backoffTime" ` +
          `or "maxRetryAttempts"`,
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

/**
 * Pauses execution for the specified duration (in milliseconds).
 */
function pause(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}
