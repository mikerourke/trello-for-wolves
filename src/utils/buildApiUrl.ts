import { stringifyQueryParams } from "./stringifyQueryParams";
import { Config } from "../typeDefs";

/**
 * Constructs the endpoint for performing the API request.
 */
export function buildApiUrl({
  endpoint,
  config,
  queryParamsByName,
  isReturnOnly = false,
}: {
  endpoint: string;
  config: Config;
  queryParamsByName?: object;
  isReturnOnly?: boolean;
}): string {
  const validParamsByName = {
    ...(queryParamsByName ?? {}),
  } as Record<string, string>;

  // Don't include the key and token if only getting the URL. We don't need it
  // for making batch requests:
  if (!isReturnOnly) {
    validParamsByName.key = config.key;
    validParamsByName.token = config.token;
  }

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
  const validUrl = sanitizeUrl(`/${endpoint}`);

  // If the user is calling `urlFor()` from the resource (for batching), don't
  // include the Trello url:
  if (isReturnOnly) {
    return queryString === "" ? validUrl : `${validUrl}?${queryString}`;
  }

  return `https://api.trello.com/1${validUrl}?${queryString}`;
}

function sanitizeUrl(url: string): string {
  return url.replace(/\/+/g, "/").replace(/\/+$/, "");
}
