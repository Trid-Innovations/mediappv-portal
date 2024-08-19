export const mediappvProviderIdQueryParamKeyName = 'providerId';
export const mediappvCostQueryParamKeyName = 'cost';
export const mediappvArticleLinkParamKeyName = 'articleLink';
export const mediappvRedirectionParamKeyName = 'redirection';
export const getParamValueFromUrl = (param: string) => {
  const urlSearchParam = new URLSearchParams(document.location.search);
  return urlSearchParam.get(param) as string;
};

export const getPaymentDetailsFromUrl = () => {
  const urlSearchParam = new URLSearchParams(document.location.search);
  const articleLink = urlSearchParam.get(mediappvArticleLinkParamKeyName) as string;
  const cost = urlSearchParam.get(mediappvCostQueryParamKeyName) as string;
  const redirection = urlSearchParam.get(mediappvRedirectionParamKeyName) as string;
  const providerId = urlSearchParam.get(mediappvProviderIdQueryParamKeyName) as string;
  return {
    articleLink,
    providerId,
    cost,
    redirection,
  };
};
