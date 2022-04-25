import { Link as PrismaLink } from '@prisma/client';
import { nanoid } from 'nanoid';

import prisma from 'config/prisma';

class Link {
    static get = async (shortId: string): Promise<PrismaLink | null> => (prisma
      ? prisma.link.findFirst({
        where: {
          short_id: shortId,
        },
      })
      : null);

    static findOrCreate = async (account: string, domain: string): Promise<PrismaLink | null> => (prisma
      ? prisma.link.findFirst({
        where: {
          account,
          domain,
        },
      })
      : null);

    static create = async (account: string, domain: string): Promise<PrismaLink | null> => {
      if (!prisma) return null;
      const shortId = Link._createShortId(account, domain);

      return prisma.link.create({
        data: {
          account,
          domain,
          short_id: shortId,
        },
      });
    };

    static _createShortId = (_account: string, _domain: string) => nanoid(8);
}

export default Link;
