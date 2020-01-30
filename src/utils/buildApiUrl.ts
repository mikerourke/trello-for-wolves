import { stringifyQueryParams } from "./stringifyQueryParams";
import { Config } from "../typeDefs";

/**
 * Constructs the endpoint for performing the API request.
 */
export function buildApiUrl({
  endpoint,
  config,
  queryParamsByName,
}: {
  endpoint: string;
  config: Config;
  queryParamsByName?: object;
}): string {
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
  const validUrl = sanitizeUrl(`/${endpoint}`);

  return `https://api.trello.com/1${validUrl}?${queryString}`;
}

function sanitizeUrl(url: string): string {
  return url.replace(/\/+/g, "/").replace(/\/+$/, "");
}
