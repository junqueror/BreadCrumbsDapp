const round = (num: number, decimals: number = 2) => Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
const percentage = (num: number, total: number) => round((num / total) * 100);

export {
  round,
  percentage,
};
