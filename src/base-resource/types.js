/* @flow */

export type ResourceName =
  'action'
  | 'attachment'
  | 'board'
  | 'card'
  | 'checklist'
  | 'label'
  | 'list'
  | 'member'
  | 'notification'
  | 'organization'
  | 'search'
  | 'token'
  | 'type';

export type ResourceConstructorOptions = {
  instanceId?: string,
  parentPath?: string,
  resourcePath?: string,
};
