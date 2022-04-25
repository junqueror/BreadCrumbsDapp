import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@prisma/client';

import prisma from 'config/prisma';
import { api } from 'config/routing';

export const path = api.clients;

export type ClientType = {
  email: string,
}

export interface Data {
  client: ClientType,
}

export const createClient = async (_client: ClientType): Promise<Data | { error: string }> => {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(_client),
  });

  const data: { client: ClientType } = await res.json();

  return data;
};

const _createClient = async (client: ClientType): Promise<Client> => prisma.client.create({
  data: client,
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) => {
  const {
    body,
    method,
  } = req;

  if (method === 'POST') {
    try {
      const _client: ClientType = body;

      const client = await _createClient(_client);

      if (client) {
        res.status(200).json({ client });
      } else res.status(404);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error creating client: ${err}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
