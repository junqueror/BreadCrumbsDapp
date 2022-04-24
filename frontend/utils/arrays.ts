const getSingleQueryParam = (param?: string[] | string) => {
  if (Array.isArray(param)) return param[0] ? param[0] : undefined;
  return param;
};
export {
  getSingleQueryParam,
};
