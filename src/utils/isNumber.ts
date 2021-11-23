export const isNumber = (
  string: any,
  sign: 'positive' | 'negative' | 'both' = 'both',
  type: 'integer' | 'float' | 'both' = 'both',
) =>
  new RegExp(
    [
      '^',
      /* eslint-disable no-nested-ternary, prettier/prettier */
      sign === 'positive' ? ''
        : sign === 'negative' ? '-'
        : '-?',
      /\d+/.source,
      type === 'integer' ? ''
        : type === 'float' ? /\.\d?/.source
        : /(\.\d?)?/.source,
      /* eslint-enable */
      '$',
    ]
      .filter((v) => v)
      .join(''),
  ).test(string);
// eslint-disable-next-line prettier/prettier
export const isPositiveInteger = (string: any) =>
  isNumber(string, 'positive', 'integer');

export default isNumber;
