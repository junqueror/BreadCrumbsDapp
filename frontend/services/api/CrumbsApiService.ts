import { api } from 'config/routing';
import { Content, CrumbDataType, Data } from 'pages/api/crumbs';

class CrumbsApiService {
    static paths = {
      createCrumb: api.crumbs,
    }

    createCrumb = async (sessionId: string, domain: string, account: string): Promise<boolean> => {
      const content: Content = {
        session_id: sessionId,
        domain,
        account,
      };

      const res = await fetch(CrumbsApiService.paths.createCrumb,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(content),
        });
      const data: Data = await res.json();
      const { transactionStarted }: { transactionStarted: boolean } = data;

      return transactionStarted;
    };

    static _formatToCrumbType = (crumb: CrumbDataType) => ({
      ...crumb,
      date: new Date(crumb.date),
      payments: crumb.payments.map(payment => ({
        ...payment,
        date: new Date(payment.date),
      })),
    })
}

const crumbsApiService = new CrumbsApiService();

export default CrumbsApiService;
export {
  crumbsApiService,
};
