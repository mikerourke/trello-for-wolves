import { fetchFromApi, HttpMethod } from "../utils/fetchFromApi";
import { Config, QueryParamsByName } from "../typeDefs";

/**
 * Base class for resources.
 * @class
 */
export class BaseResource {
  protected endpointElements: string[];

  /**
   * @param config Config object containing Trello API key and token.
   * @param baseEndpoint Base endpoint for performing the request.
   * @constructor
   */
  constructor(protected config: Config, protected baseEndpoint: string) {
    this.endpointElements = this.baseEndpoint.split("/");

    if (this.endpointElements[0].length !== 0) {
      this.endpointElements.shift();
    }
  }

  protected get firstElement(): string {
    const endpointElements = this.baseEndpoint.split("/");
    return endpointElements[0].replace(/\//g, "");
  }

  protected apiGet(
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    console.log(endpoint);
    return this.performRequest("GET", endpoint, queryParamsByName, body);
  }

  protected apiPut(
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    return this.performRequest("PUT", endpoint, queryParamsByName, body);
  }

  protected apiPost(
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    return this.performRequest("POST", endpoint, queryParamsByName, body);
  }

  protected apiDelete(
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    return this.performRequest("DELETE", endpoint, queryParamsByName, body);
  }

  /**
   * Performs the request to the Trello API.
   * @param endpoint API endpoint for making request.
   * @param method Method to perform (GET, DELETE, POST, PUT).
   * @param queryParamsByName Query params to build the full URL.
   * @param body Body of the fetch call.
   */
  private performRequest(
    method: HttpMethod,
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    return fetchFromApi({
      endpoint: this.baseEndpoint.concat(endpoint),
      method,
      config: this.config,
      queryParamsByName,
      body,
    });
  }
}
