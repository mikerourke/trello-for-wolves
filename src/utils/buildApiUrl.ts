import { stringifyQueryParams } from "./stringifyQueryParams";
import { TrelloConfig } from "../typeDefs";

/**
 * Constructs the endpoint for performing the API request.
 */
export function buildApiUrl({
  endpoint,
  trelloConfig,
  paramsByName,
}: {
  endpoint: string;
  trelloConfig: TrelloConfig;
  paramsByName: Record<string, unknown>;
}): string {
  const validParamsByName = {
    ...paramsByName,
    key: trelloConfig.key,
    token: trelloConfig.token,
  };

  const queryString = stringifyQueryParams(validParamsByName);

  // Remove any duplicate `/` values. We're omitting the `https://` from the
  // URL to ensure the `//` doesn't get removed:
  const validUrl = sanitizeUrl(`/${endpoint}`);

  return `https://api.trello.com/1${validUrl}?${queryString}`;
}

function sanitizeUrl(url: string): string {
  return url.replace(/\/+/g, "/").replace(/\/+$/, "");
}
