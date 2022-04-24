import { LinkType } from 'types';

const domainToUrl = (domain: string): string => `https://${domain}`;

const redirectUrlFromLongPath = (link: LinkType, path: string): string => {
  if (!link.shortId && link.url) return link.url;
  if (!link.shortId) return domainToUrl(link.domain);

  const urlPath = path.split(link.account).slice(-1);
  return `${link.url}${urlPath}`;
};

const redirectUrlFromShortPath = (link: LinkType, path: string): string => {
  if (!link.shortId && link.url) return link.url;
  if (!link.shortId) return domainToUrl(link.domain);

  const urlPath = path.split(link.shortId).slice(-1);
  return `${link.url}${urlPath}`;
};

export {
  domainToUrl,
  redirectUrlFromLongPath,
  redirectUrlFromShortPath,
};
