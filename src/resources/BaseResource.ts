import { fetchFromApi, HttpMethod } from "../utils/fetchFromApi";
import { Config, TypedResponse } from "../typeDefs";
import { isEmpty } from "../utils/isEmpty";

/**
 * Base class for resources.
 * @class
 */
export class BaseResource {
  protected pathElements: string[];

  /**
   * @param config Config object containing Trello API key and token.
   * @param parentElements Parent path elements.
   * @param groupName Resource group name associated with the resource.
   * @param [recordId] ID for the associated resource.
   * @constructor
   */
  constructor(
    protected config: Config,
    protected parentElements: string[],
    protected groupName: string,
    protected recordId: string = "",
  ) {
    this.pathElements = [...parentElements, groupName];
    if (recordId !== "") {
      this.pathElements.push(recordId);
    }
  }

  protected validateGetSingle(): void {
    // If we're getting a board or list associated with the parent resource,
    // the groupName will be `/board` or `/list`. We don't need the ID of the
    // resource to fetch it:
    if (!this.groupName.endsWith("s")) {
      return;
    }

    if (this.recordId === "") {
      const errMessage = [
        `You cannot call get${this.singleDisplay}() without specifying an ID.`,
        "Example: trello.actions(<NEED AN ID!>).getAction()",
      ].join(" ");
      throw new Error(errMessage);
    }
  }

  protected validateUpdate(params: object | undefined): void {
    if (isEmpty(params)) {
      throw new Error(
        `You must specify at least one param when updating a ${this.singleDisplay}`,
      );
    }
  }

  protected apiGet<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.performRequest("GET", fullEndpoint, queryParamsByName, body);
  }

  protected apiGetNested<T>(
    queryParamsByName: object = {},
  ): Promise<TypedResponse<T>> {
    const validParams = {
      ...queryParamsByName,
      [this.groupName]: queryParamsByName[this.groupName] ?? "all",
    } as Record<string, string>;

    const fullEndpoint = this.pathElements
      .filter(
        pathElement => ![this.groupName, this.recordId].includes(pathElement),
      )
      .join("/");

    return this.performRequest("GET", fullEndpoint, validParams);
  }

  protected apiPut<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.performRequest("PUT", fullEndpoint, queryParamsByName, body);
  }

  protected apiPost<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.performRequest("POST", fullEndpoint, queryParamsByName, body);
  }

  protected apiDelete<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.performRequest("DELETE", fullEndpoint, queryParamsByName, body);
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
      endpoint,
      method,
      config: this.config,
      queryParamsByName,
      body,
    });
  }

  private get singleDisplay(): string {
    return this.groupDisplay.slice(0, -1);
  }

  private get groupDisplay(): string {
    return this.groupName
      .charAt(0)
      .toUpperCase()
      .concat(this.groupName.slice(1));
  }
}
