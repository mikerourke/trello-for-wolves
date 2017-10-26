/* eslint-disable import/prefer-default-export */
/* @flow */

export const generateTypeMap = (...args: any) => (
  args.reduce((acc, itemName) => ({
    ...acc,
    [itemName]: itemName,
  }), {})
);
