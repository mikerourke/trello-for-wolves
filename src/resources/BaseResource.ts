import { fetchFromApi, HttpMethod } from "../utils/fetchFromApi";
import { Config, TypedResponse } from "../typeDefs";

/**
 * Base class for resources.
 * @class
 */
export class BaseResource {
  protected endpointElements: string[];

  /**
   * @param config Config object containing Trello API key and token.
   * @param baseEndpoint Base endpoint for performing the request.
   * @param isNested Indicates if the request can only be performed via nested.
   * @constructor
   */
  constructor(
    protected config: Config,
    protected baseEndpoint: string,
    protected isNested: boolean = false,
  ) {
    this.endpointElements = this.baseEndpoint.split("/");

    if (this.endpointElements[0].length !== 0) {
      this.endpointElements.shift();
    }
  }

  protected apiGet<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    return this.performRequest("GET", endpoint, queryParamsByName, body);
  }

  protected apiPut<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    return this.performRequest("PUT", endpoint, queryParamsByName, body);
  }

  protected apiPost<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    return this.performRequest("POST", endpoint, queryParamsByName, body);
  }

  protected apiDelete<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    return this.performRequest("DELETE", endpoint, queryParamsByName, body);
  }

  /**
   * Performs the request to the Trello API.
   * @param endpoint API endpoint for making request.
   * @param method Method to perform (GET, DELETE, POST, PUT).
   * @param queryParamsByName Query params to build the full URL.
   * @param body Body of the fetch call.
   */
  private performRequest<T>(
    method: HttpMethod,
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    return fetchFromApi<T>({
      endpoint: this.baseEndpoint.concat(endpoint),
      method,
      config: this.config,
      queryParamsByName,
      body,
    });
  }
}
