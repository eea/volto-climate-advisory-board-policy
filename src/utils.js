export const filtered = (arr, callback) => {
  return arr.reduce(
    (arr, item) => {
      const [pass, fail] = arr;
      return callback(item) ? [[...pass, item], fail] : [pass, [...fail, item]];
    },
    [[], []],
  );
};
