/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  AllOrNone,
  Auth,
  CardInclusionQueryArgs,
  CheckItemInclusionQueryArgs,
  ChecklistField,
  FieldsQueryArg,
  FilterQueryArg,
  ResourceConstructorOptions,
} from '../types';

type GetQueryArgs =
  CardInclusionQueryArgs &
  CheckItemInclusionQueryArgs &
  FieldsQueryArg<ChecklistField>;

/**
 * Class representing a Checklist resource.
 * @extends BaseResource
 */
export default class Checklist extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'checklist', options);
  }

  getChecklist(queryArgs?: GetQueryArgs): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getChecklists(queryArgs?: GetQueryArgs &
    FilterQueryArg<AllOrNone> = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getChecklistFieldValue(field: ChecklistField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  createChecklist(queryArgs: {
    name: string,
  }): Promise<*> {
    return this.httpPost('/', queryArgs);
  }
}
