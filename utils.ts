export const mediappvReturnUrlParamKeyName = 'returnUrl';
export const getReturnUrlFromUrl = () => {
  const urlSearchParam = new URLSearchParams(document.location.search);
  return urlSearchParam.get(mediappvReturnUrlParamKeyName) as string;
};
