import { fetchFromApi, HttpMethod } from "../utils/fetchFromApi";
import { AnyParams, TrelloConfig, TypedFetch } from "../typeDefs";

interface BaseResourceOptions {
  identifier?: string;
}

/**
 * Base class for resources. All other resources extend this class.
 * @class
 */
export class BaseResource {
  protected identifier: string = "";
  protected pathElements: string[];

  /**
   * @param config TrelloConfig object containing Trello API key, token and rate limiting options.
   * @param parentElements Parent path elements.
   * @param groupName Group name associated with the resource.
   * @param [options] Additional options for the resource.
   * @constructor
   */
  constructor(
    protected config: TrelloConfig,
    protected parentElements: string[],
    protected groupName: string,
    options: BaseResourceOptions = {},
  ) {
    this.pathElements = [...parentElements, groupName];
    this.identifier = options.identifier ?? "";

    if (this.identifier) {
      this.pathElements.push(this.identifier);
    }
  }

  /**
   * Returns true if the path elements of this resource instance contains the
   * contents of the specified group name/names argument.
   * @example
   *   const resource = trello.boards("74836e2c91e31d1746008921").actions().getActions();
   *   // From the `actions` instance:
   *   console.log(this.isChildOf("board")); // true
   *   console.log(this.isChildOf("action")); // false
   *
   * @example
   *   const resource = trello.boards("74836e2c91e31d1746008921").actions().getActions();
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

  protected apiGet<T>(
    endpoint: string,
    paramsByName?: AnyParams,
    body?: unknown,
  ): TypedFetch<T> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("GET", fullEndpoint, paramsByName, body);
  }

  protected apiPut<T>(
    endpoint: string,
    paramsByName?: AnyParams,
    body?: unknown,
  ): TypedFetch<T> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("PUT", fullEndpoint, paramsByName, body);
  }

  protected apiPost<T>(
    endpoint: string,
    paramsByName?: AnyParams,
    body?: unknown,
  ): TypedFetch<T> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("POST", fullEndpoint, paramsByName, body);
  }

  protected apiDelete<T>(
    endpoint: string,
    paramsByName?: AnyParams,
    body?: unknown,
  ): TypedFetch<T> {
    const fullEndpoint = this.pathElements.join("/").concat(endpoint);
    return this.onApiFetch("DELETE", fullEndpoint, paramsByName, body);
  }

  /**
   * Performs the request to the Trello API and returns response or returns the
   * URL string associated with the endpoint.
   * @param endpoint API endpoint for making request.
   * @param method Method to perform (GET, DELETE, POST, PUT).
   * @param paramsByName Params to build the full URL.
   * @param body Body of the fetch call.
   */
  private onApiFetch<T>(
    method: HttpMethod,
    endpoint: string,
    paramsByName?: AnyParams,
    body: unknown = {},
  ): TypedFetch<T> {
    return fetchFromApi<T>({
      endpoint,
      trelloConfig: this.config,
      fetchConfig: { body: body as BodyInit, method },
      paramsByName,
    });
  }
}
