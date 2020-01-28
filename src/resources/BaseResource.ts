import { fetchFromApi, HttpMethod } from "../utils/fetchFromApi";
import { Config, TypedResponse } from "../typeDefs";
import { isEmpty } from "../utils/isEmpty";
import { buildApiUrl } from "../utils/buildApiUrl";

interface BaseResourceOptions {
  identifier?: string;
  isReturnUrl?: boolean;
}

/**
 * Base class for resources.
 * @class
 */
export class BaseResource {
  protected identifier: string = "";
  protected isReturnUrl: boolean = false;
  protected pathElements: string[];

  /**
   * @param config Config object containing Trello API key, token and rate limiting options.
   * @param parentElements Parent path elements.
   * @param groupName Group name associated with the resource.
   * @param [options] Additional options for the resource.
   * @constructor
   */
  constructor(
    protected config: Config,
    protected parentElements: string[],
    protected groupName: string,
    protected options: BaseResourceOptions = {
      identifier: "",
      isReturnUrl: false,
    },
  ) {
    this.pathElements = [...parentElements, groupName];
    this.identifier = options.identifier ?? "";
    this.isReturnUrl = options.isReturnUrl ?? false;

    if (this.identifier) {
      this.pathElements.push(this.identifier);
    }
  }

  /**
   * Sets the flag to return the URL string from the method call instead of
   * actually making the fetch request.
   * @example
   *   const result = trello.boards("boardid").urlFor().actions().getActions({ filter: "all" });
   *   console.log(result); // logs /boards/boardid/actions?filter=all
   */
  public urlFor(): this {
    this.isReturnUrl = true;
    return this;
  }

  protected isChildOf(groupName: string | string[]): boolean {
    const parentGroupName = this.pathElements[0];

    if (Array.isArray(groupName)) {
      return groupName.includes(parentGroupName);
    }

    return parentGroupName.includes(groupName);
  }

  protected apiGet<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("GET", fullEndpoint, queryParamsByName, body);
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
        pathElement => ![this.groupName, this.identifier].includes(pathElement),
      )
      .join("/");

    return this.onApiFetch("GET", fullEndpoint, validParams);
  }

  protected apiPut<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("PUT", fullEndpoint, queryParamsByName, body);
  }

  protected apiPost<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("POST", fullEndpoint, queryParamsByName, body);
  }

  protected apiDelete<T>(
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("DELETE", fullEndpoint, queryParamsByName, body);
  }

  protected validateGetSingle(): void {
    // If we're getting a board or list associated with the parent resource,
    // the groupName will be `/board` or `/list`. We don't need the ID of the
    // resource to fetch it:
    if (!this.groupName.endsWith("s")) {
      return;
    }

    this.validateIdentifier();
  }

  protected validateUpdate(params: object | undefined): void {
    this.validateIdentifier();

    if (isEmpty(params)) {
      throw new Error(
        "You must specify at least one param when updating a resource",
      );
    }
  }

  protected validateIdentifier(): void {
    if (!this.identifier) {
      const errMessage = [
        "You must specify an ID for the resource instance.",
        "Example: trello.actions(<NEED AN ID>).getAction()",
      ].join(" ");
      throw new Error(errMessage);
    }
  }

  /**
   * Performs the request to the Trello API and returns response or returns the
   * URL string associated with the endpoint.
   * @param endpoint API endpoint for making request.
   * @param method Method to perform (GET, DELETE, POST, PUT).
   * @param queryParamsByName Query params to build the full URL.
   * @param body Body of the fetch call.
   */
  private onApiFetch<T>(
    method: HttpMethod,
    endpoint: string,
    queryParamsByName?: object,
    body?: unknown,
  ): Promise<TypedResponse<T>> {
    if (this.isReturnUrl) {
      this.isReturnUrl = false;
      return this.getUrl(endpoint, queryParamsByName);
    }

    return fetchFromApi<T>({
      endpoint,
      method,
      config: this.config,
      queryParamsByName,
      body,
    });
  }

  private getUrl<T>(
    endpoint: string,
    queryParamsByName?: object,
  ): Promise<TypedResponse<T>> {
    return (buildApiUrl({
      endpoint,
      config: this.config,
      queryParamsByName,
      isReturnOnly: true,
    }) as unknown) as Promise<TypedResponse<T>>;
  }
}
