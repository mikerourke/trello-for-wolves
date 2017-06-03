/* @flow */

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
} from '../types';

export type LabelColor =
  'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow';

export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

/**
 * @apiDefine LabelInclusionQueryArgs
 * @apiParam {String="all","none"} [labels='"none"'] Labels to include in
 *    response.
 * @apiParam {String="all","color","idBoard","name","uses"} [labelFields='"all"']
 *    Label fields to include in response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 */
export type LabelInclusionQueryArgs = {
  labels?: AllOrNone,
  labelFields?: ArgumentGroup<LabelField>,
};
