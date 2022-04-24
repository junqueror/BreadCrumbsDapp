import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { paths } from 'config/routing';
import useAccountContext from 'contexts/account';

interface Props {
    children: ReactNode,
}

const defaultProps = {
};

const AuthRouter: FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const { account, error } = useAccountContext();

  useEffect(() => {
    const isHomePath = router.pathname === paths.home;

    if (!isHomePath && (!account?.address || error)) {
      // router.replace(paths.home);
    }
  }, [router, account?.address, error]);

  return (
    <>
      { children }
    </>
  );
};

AuthRouter.defaultProps = defaultProps;

export default AuthRouter;
