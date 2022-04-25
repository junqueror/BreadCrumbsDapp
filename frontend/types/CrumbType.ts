import type PaymentType from './PaymentType';

type CrumbType = {
    sessionId: string,
    domain: string,
    date: Date,
    payments: PaymentType[],
    paymentsCount: number,
}

export default CrumbType;
