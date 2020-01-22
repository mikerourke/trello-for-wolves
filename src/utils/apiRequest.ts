import fetch from "cross-fetch";

export type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

/**
 * Returns a resolved Promise with the results of the Trello API call.
 * @param httpMethod Method associated with the request.
 * @param endpoint Endpoint for API request.
 * @param backoffTime Amount of time to wait between API requests.
 * @param maxRetryAttempts Maximum number of attempts to retry requests.
 * @param [queryArgs={}] Arguments for building the querystring.
 * @private
 */
export async function performApiRequest<TQueryArgs>({
  httpMethod,
  endpoint,
  backoffTime,
  maxRetryAttempts,
  queryArgs,
}: {
  httpMethod: HttpMethod;
  endpoint: string;
  backoffTime: number;
  maxRetryAttempts: number;
  queryArgs?: TQueryArgs;
}): Promise<unknown> {
  // One more check is done to ensure there are no consecutive slashes.
  const apiUrl = `https://api.trello.com/1${endpoint}`;

  // Build the configuration object for sending the request.
  const fetchConfig = getFetchConfig(httpMethod, apiUrl, queryArgs);

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

function pause(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}

// FIXME: This needs to be updated for the Fetch API.
function getFetchConfig<TQueryArgs>(
  httpMethod: HttpMethod,
  requestUrl: string,
  queryArgs: TQueryArgs | {} = {},
): object {
  type RequestConfig = TQueryArgs & {
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

  const validQueryArgs = queryArgs as any;

  if (validQueryArgs?.file?.readable) {
    const fileName = validQueryArgs?.name ?? "file";
    const formData = {
      name: fileName,
      file: validQueryArgs?.file,
      mimeType: undefined,
    } as RequestConfig;

    if (validQueryArgs.mimeType) {
      formData.mimeType = validQueryArgs.mimeType;
    }

    (requestConfig as any).formData = formData;
  }

  return requestConfig;
}
