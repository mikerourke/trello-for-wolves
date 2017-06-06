/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  BoardInclusionQueryArgs,
  CardInclusionQueryArgs,
  FieldsQueryArg,
  FilterQueryArg,
  LimitQueryArg,
  ListField,
  ListFilter,
  PositionNumbered,
  ResourceConstructorOptions,
  ValueQueryArg,
} from '../types';

type ListPosQueryArg = {
  pos?: PositionNumbered,
};

export default class List extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'list', options);
  }

  getList(
    queryArgs?: BoardInclusionQueryArgs &
      CardInclusionQueryArgs &
      FieldsQueryArg<ListField> &
      FilterQueryArg<ListField> = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getLists(
    queryArgs?: FieldsQueryArg<ListField> &
      LimitQueryArg = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ListField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getFilteredLists(queryArgs: FilterQueryArg<ListFilter>): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateList(
    queryArgs?: ListPosQueryArg &
      {
        name?: string,
        closed?: boolean,
        idBoard?: string,
        subscribed?: boolean,
      } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/closed', queryArgs);
  }

  updateIdBoard(
    queryArgs: ValueQueryArg<string> & ListPosQueryArg,
  ): Promise<*> {
    return this.httpPut('/idBoard', queryArgs);
  }

  updateName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updatePosition(queryArgs: ValueQueryArg<PositionNumbered>): Promise<*> {
    return this.httpPut('/pos', queryArgs);
  }

  updatedSubscribed(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/subscribed', queryArgs);
  }

  createList(
    queryArgs: ListPosQueryArg & {
      name: string,
      idBoard: string,
      idListSource?: string,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  archiveAllCards() {
    return this.httpPost('/archiveAllCards');
  }

  moveAllCards(
    queryArgs: {
      idBoard: string,
      idList: string,
    },
  ) {
    return this.httpPost('/moveAllCards', queryArgs);
  }
}
