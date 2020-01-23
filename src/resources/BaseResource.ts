import {
  fetchFromApi,
  HttpMethod,
  QueryParamsByName,
} from "../utils/fetchFromApi";
import { Config } from "../typeDefs";

/**
 * Base class for resources.
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

  protected httpGet(
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    return this.performRequest("GET", endpoint, queryParamsByName, body);
  }

  protected httpPut(
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    return this.performRequest("PUT", endpoint, queryParamsByName, body);
  }

  protected httpPost(
    endpoint: string,
    queryParamsByName?: QueryParamsByName,
    body?: unknown,
  ): Promise<unknown> {
    return this.performRequest("POST", endpoint, queryParamsByName, body);
  }

  protected httpDelete(
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
