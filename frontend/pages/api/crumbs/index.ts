import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

import SERVER_CONFIG from 'config/server';
import CrumbsBlockchainService from 'services/blockchain/CrumbsBlockchainService';
import { CrumbType } from 'types';
import { initMiddleware } from 'utils/middlewares';

export type CrumbDataType = Omit<CrumbType, 'date'> & {
    date: string,
    payments: Omit<PaymentType, 'date'> & {
      date: string,
    }[],
};

export type Content = {
    session_id: string,
    domain: string,
    account: string,
}

export type Data = {
    transactionStarted: boolean,
}

export type Error = {
  message: string,
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options

  Cors({
    origin: true,
    methods: ['POST'],
  }),
);

const crumbsBlockchainService = new CrumbsBlockchainService(
  undefined,
  undefined,
  SERVER_CONFIG.WEB3.DEPLOYER_PRIVATE_KEY,
);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>,
) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method not allowed' });
    return;
  }

  await cors(req, res);

  const content: Content = req.body;

  const result = await crumbsBlockchainService.createCrumb(
    content.session_id,
    content.domain,
    content.account,
  );

  res.status(200).json({
    transactionStarted: result,
  });
};

export default handler;
