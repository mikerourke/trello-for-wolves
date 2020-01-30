import { buildApiUrl } from "../utils/buildApiUrl";
import { fetchFromApi, HttpMethod } from "../utils/fetchFromApi";
import { Config, TypedResponse } from "../typeDefs";

interface BaseResourceOptions {
  identifier?: string;
  isReturnUrl?: boolean;
}

/**
 * Base class for resources. All other resources extend this class.
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
    options: BaseResourceOptions = {
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

  /**
   * Returns true if the path elements of this resource instance contains the
   * contents of the specified group name/names argument.
   * @example
   *   const resource = trello.boards("boardid").actions().getActions();
   *   // From the `actions` instance:
   *   console.log(this.isChildOf("board")); // true
   *   console.log(this.isChildOf("action")); // false
   *
   * @example
   *   const resource = trello.boards("boardid").actions().getActions();
   *   // From the `actions` instance:
   *   console.log(this.isChildOf(["board", "enterprise"])); // true
   *   console.log(this.isChildOf(["action", "organization"])); // false
   */
  protected isChildOf(groupNameOrNames: string | string[]): boolean {
    const parentGroupName = this.pathElements[0];

    // If the arg is an array, create a RegExp instance that combines all of
    // the array values (separated by a pipe) and return the result of testing
    // it against the parentGroupName:
    if (Array.isArray(groupNameOrNames)) {
      const namePattern = groupNameOrNames.join("|");
      const nameRegex = new RegExp(namePattern, "ig");
      return nameRegex.test(parentGroupName);
    }

    return parentGroupName.includes(groupNameOrNames);
  }

  protected validateUrl(fieldName: string, value?: string): void {
    if (value && !/http:\/\/|https:\/\//gi.test(value.toString())) {
      throw new Error(
        `The "${fieldName}" field must start with "http://" or "https://"`,
      );
    }
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

    if (this.groupName === "reactions") {
      validParams.reactions = queryParamsByName[this.groupName] ?? true;
    } else {
      validParams[this.groupName] = queryParamsByName[this.groupName] ?? "all";
    }

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
