export enum BasketTypeEnum {
    Affiliate = 'Affiliate',
    Referral = 'Referral',
    ISO = 'ISO',
}

export enum ObjectiveEnum {
    Domain = 'Domain visit',
    URL = 'Url visit',
    TimeOnPage = 'Domain visit time',
    Click = 'Click',
    APIrequest = 'API request',
}

export enum PriceTypeEnum {
    FixedToken = 'Fixed to currency',
    FixedUSD = 'Fixed to USD',
}
  
type BasketType = {
    title?: string,
    account: string,
    domain: string,
    description?: string,
    image?: string,
    type: BasketTypeEnum,
    startDate: Date,
    endDate?: Date,
    objective: ObjectiveEnum,
    currency: string,
    priceType: PriceTypeEnum,
    budget: number | string,
    amount: number | string,
    price: number | string,
}

export default BasketType;
