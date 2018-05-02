import BaseResource from './baseResource';
import Board from './board';
import { ArgumentGroup } from '../types';

export type LabelColor =
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'sky'
  | 'lime'
  | 'pink'
  | 'black';

export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

/**
 * @namespace Label
 */
export default class Label extends BaseResource {
  public getLabels = (queryArgs?: {
    fields?: ArgumentGroup<LabelField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getLabel = (queryArgs?: {
    fields?: ArgumentGroup<LabelField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public board = () => new Board(this.config, `${this.routePath}/board`);

  public updateLabel = (queryArgs?: {
    name?: string;
    color?: LabelColor | null;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateColor = (value: LabelColor | null): Promise<any> =>
    this.httpPut('/color', { value });

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public addLabel(queryArgs: {
    name: string;
    color: LabelColor | null;
    idBoard?: string;
  }): Promise<any> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'boards') {
      updatedArgs = { ...queryArgs, idBoard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  public deleteLabel = (): Promise<any> => this.httpDelete('/');
}
