import type { NextApiRequest, NextApiResponse } from 'next';

import Link from 'database/Link';
import LinkType from 'types/LinkType';

import { formatLink } from '../[account]/[domain]';

export interface Data {
    link: LinkType,
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) => {
  const { shortId: shortIds } = req.query;

  const shortId = Array.isArray(shortIds) ? shortIds[0] : shortIds;

  try {
    const dbLink = await Link.get(shortId);

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
