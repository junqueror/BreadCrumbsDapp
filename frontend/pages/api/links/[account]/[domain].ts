import type { NextApiRequest, NextApiResponse } from 'next';
import { Link as PrismaLink } from '@prisma/client';

import { paths } from 'config/routing';
import site from 'config/site';
import Link from 'database/Link';
import LinkType from 'types/LinkType';
import { domainToUrl } from 'utils/url';

export interface Data {
    link: LinkType,
}

export const createShortUrl = (shortId: string): string => `${site.BASE_URL}/${paths.shortLink(shortId)}`;

export const createLongUrl = (account: string, domain: string): string => `${site.BASE_URL}/${paths.link(domain, account)}`;

export const formatLink = (dbLink: PrismaLink): LinkType => ({
  id: dbLink.id,
  domain: dbLink.domain,
  url: dbLink.domain
    ? domainToUrl(dbLink.domain) : null,
  longUrl: (dbLink.account && dbLink.domain)
    ? createLongUrl(dbLink.account, dbLink.domain)
    : null,
  shortId: dbLink.short_id,
  shortUrl: dbLink.short_id
    ? createShortUrl(dbLink.short_id)
    : null,
  account: dbLink.account,
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) => {
  const { account: accounts, domain: domains } = req.query;

  const account = Array.isArray(accounts) ? accounts[0] : accounts;
  const domain = Array.isArray(domains) ? domains[0] : domains;

  try {
    let dbLink = await Link.findOrCreate(account, domain);
    if (!dbLink) dbLink = await Link.create(account, domain);

    if (dbLink) {
      res.status(200).json({
        link: formatLink(dbLink),
      });
    } else res.status(404);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error retrieving link' });
  }
};

export default handler;
