import { api } from 'config/routing';
import LinkType from 'types/LinkType';

class LinkApiService {
    static paths = {
      getLink: api.link,
      getShortLink: api.shortLink,
    }

    getLink = async (account: string, domain: string): Promise<LinkType> => {
      const res = await fetch(LinkApiService.paths.getLink(account, domain));
      const data: { link: LinkType } = await res.json();

      return data.link || undefined;
    };

    getLinkFromShortId = async (shortId: string): Promise<LinkType> => {
      const res = await fetch(LinkApiService.paths.getShortLink(shortId));
      const data: { link: LinkType } = await res.json();

      return data.link || undefined;
    };
}

const linkApiService = new LinkApiService();

export default LinkApiService;
export {
  linkApiService,
};
