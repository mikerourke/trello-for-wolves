import { stringify } from "qs";
import { performApiRequest, HttpMethod } from "../utils/apiRequest";
import { stringifyQueryArgs } from "../utils/queryArgsStringifier";
import { Config } from "../typeDefs";

/**
 * Base class for resources.
 */
export class BaseResource {
  protected routePathElements: string[];

  /**
   * @param config Config object containing Trello API key and token.
   * @param routePath Route path for performing the request.
   * @param associationId Id number of the associated resource to update.
   * @constructor
   */
  constructor(
    protected config: Config,
    protected routePath: string,
    protected associationId: string = "",
  ) {
    this.routePathElements = this.routePath.split("/");

    if (this.routePathElements[0].length !== 0) {
      this.routePathElements.shift();
    }
  }

  protected httpGet<TQueryArgs = {}>(
    pathVariables: string,
    queryArgs?: TQueryArgs,
  ): Promise<unknown> {
    return this.performRequest("GET", pathVariables, queryArgs);
  }

  protected httpPut<TQueryArgs = {}>(
    pathVariables: string,
    queryArgs?: TQueryArgs,
  ): Promise<unknown> {
    return this.performRequest("PUT", pathVariables, queryArgs);
  }

  protected httpPost<TQueryArgs = {}>(
    pathVariables: string,
    queryArgs?: TQueryArgs,
  ): Promise<unknown> {
    return this.performRequest("POST", pathVariables, queryArgs);
  }

  protected httpDelete<TQueryArgs = {}>(
    pathVariables: string,
    queryArgs?: TQueryArgs,
  ): Promise<unknown> {
    return this.performRequest("DELETE", pathVariables, queryArgs);
  }

  /**
   * Performs the request to the Trello API.
   * @param httpMethod Method to perform (GET, DELETE, POST, PUT).
   * @param pathVariables Path to append to end of resource path.
   * @param queryArgs Query args to build the final endpoint.
   */
  private performRequest<TQueryArgs>(
    httpMethod: HttpMethod,
    pathVariables: string,
    queryArgs?: TQueryArgs,
  ): Promise<unknown> {
    const endpoint = this.getEndpoint(pathVariables, queryArgs);
    const { backoffTime = 3000, maxRetryAttempts = 5 } = this.config;
    return performApiRequest({
      httpMethod,
      endpoint,
      backoffTime,
      maxRetryAttempts,
      queryArgs,
    });
  }

  /**
   * Constructs the endpoint for performing the API request.
   * @param pathVariables Path to append to the route path.
   * @param [queryArgs={}] Optional arguments specified for performing the request.
   */
  private getEndpoint<TQueryArgs = {}>(
    pathVariables: string,
    queryArgs: TQueryArgs | {} = {},
  ): string {
    // Check if queryArgs were specified to ensure the stringify function is
    // only called if necessary.
    let argsToUse = queryArgs as any;
    let hasQueryArgs = false;

    if (Object.keys(argsToUse).length !== 0) {
      // We don't want to attempt to stringify the 'file' query arg.
      // @ts-ignore
      const { file, ...otherArgs } = queryArgs;
      argsToUse = otherArgs;
      hasQueryArgs = true;
    }

    // Build the base path based on the current path.  This ensures that the path can
    // continue to be appended without being overwritten.
    const basePath = `${this.routePath}${pathVariables}`;

    // Remove any consecutive and trailing slashes.
    const sanitizedPath = basePath.replace(/\/+/g, "/").replace(/\/+$/, "");

    // If queryArgs were provided, build the corresponding querystring to
    // include the specified arguments.
    const queryString = hasQueryArgs ? stringifyQueryArgs(argsToUse) : "";

    // Ensure the key and token is appended to the end of the querystring.
    const { key, token } = this.config;
    const authSuffix = stringify({ key, token });
    return `${sanitizedPath}?${queryString}${authSuffix}`;
  }
}
