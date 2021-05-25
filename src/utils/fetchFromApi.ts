import { TrelloForWolvesError } from "../TrelloForWolvesError";

import { AnyParams, TrelloConfig, TypedResponse } from "../typeDefs";

import { buildApiUrl } from "./buildApiUrl";
import { isEmpty } from "./isEmpty";

export type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

/**
 * Returns a resolved Promise with the results of the Trello API call.
 * @private
 */
export async function fetchFromApi<T>({
  endpoint,
  trelloConfig,
  fetchConfig = null,
  paramsByName = null,
}: {
  endpoint: string;
  trelloConfig: TrelloConfig;
  fetchConfig?: RequestInit | null;
  paramsByName?: AnyParams | null;
}): Promise<TypedResponse<T>> {
  if (!trelloConfig.key) {
    throw new TrelloForWolvesError(
      `You must provide a "key" to the Trello instance config object`,
    );
  }

  if (!trelloConfig.token) {
    throw new TrelloForWolvesError(
      `You must provide a "token" to the Trello instance config object`,
    );
  }

  const { backoffTime = 3000, maxRetryAttempts = 5 } = trelloConfig;

  const validParamsByName = paramsByName === null ? {} : paramsByName;
  const validFetchConfig =
    fetchConfig === null ? { method: "GET" } : fetchConfig;

  validFetchConfig.body = await getFetchBodyByEnvironment(
    trelloConfig,
    validFetchConfig.body ?? null,
    validParamsByName,
  );

  if ("file" in validParamsByName) {
    delete validParamsByName.file;
  }

  if ("fileSource" in validParamsByName) {
    delete validParamsByName.fileSource;
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
 * Returns the "body" for the fetchConfig object based on whether a file needs
 * to be attached. If using this library in the browser, use window.FormData,
 * otherwise use the form-data library.
 */
async function getFetchBodyByEnvironment(
  trelloConfig: TrelloConfig,
  body: BodyInit | null,
  paramsByName: AnyParams,
): Promise<BodyInit | null> {
  // If the user stringifies the body when calling `makeApiRequest`, we don't
  // want to stringify it again:
  if (typeof body === "string" || body instanceof String) {
    return body;
  }

  const hasFileInParams =
    "file" in paramsByName || "fileSource" in paramsByName;

  if (!isEmpty(paramsByName) && hasFileInParams) {
    // We're working in the browser, so we should use FormData to send file
    // upload details:
    if (
      typeof window !== "undefined" &&
      typeof window.FormData !== "undefined"
    ) {
      const formData = new window.FormData();
      return appendDataToForm(formData, trelloConfig, paramsByName);
    }

    // We're working in Node.js. We can't use streams because Trello requires
    // that all attachments use multipart/form-data:
    const { default: FormData } = await import("form-data");
    const formData = new FormData();
    return appendDataToForm(formData, trelloConfig, paramsByName);
  }

  if (isEmpty(body)) {
    return null;
  }

  return JSON.stringify(body);
}

function appendDataToForm(
  formData: unknown,
  trelloConfig: TrelloConfig,
  paramsByName: AnyParams,
): FormData {
  const validFormData = formData as FormData;
  validFormData.append("key", trelloConfig.key);
  validFormData.append("token", trelloConfig.token);

  const fileParamName = "fileSource" in paramsByName ? "fileSource" : "file";
  validFormData.append(fileParamName, paramsByName[fileParamName] as Blob);

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

  if (response.status === 429 && attemptsRemaining > 0) {
    await pause(backoffTime);
    return await fetchWithRetries(
      apiUrl,
      fetchConfig,
      backoffTime,
      attemptsRemaining - 1,
    );
  }

  return response;
}

/**
 * Pauses execution for the specified duration (in milliseconds).
 */
function pause(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
