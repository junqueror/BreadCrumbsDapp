export type BakersSection = {
    id: string,
    title: string,
    subtitle?: string,
    button?: string,
    infoNotification?: {
      title: string,
      message: Function,
    },
    errorNotification?: {
      title: string,
      message: Function,
    },
}

export type BakersContent = {
  title: string,
  warning?: string,
  sections: BakersSection[],
}

const bakersContent: BakersContent = {
  title: 'Baker area',
  warning: 'The Breadcrumbs services and the baker panel shown on this page are currently under development. The campaigns and projects shown in this marketplace are not active, and are only shown for the purpose of showing future behavior and testing.',
  sections: [
    {
      id: 'current-baskets',
      title: 'Current baskets',
      button: 'New basket',
      infoNotification: {
        title: 'Basket created',
        message: (domain:string) => `'${domain}' basket is now available`,
      },
      errorNotification: {
        title: 'Basket was not created',
        message: (domain:string) => `Error creating the basket. '${domain}' basket is not available`,
      },
    },
    {
      id: 'baskets-history',
      title: 'Baskets history',
    },
  ],
};

export default bakersContent;
