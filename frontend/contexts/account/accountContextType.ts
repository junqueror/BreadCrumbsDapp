import AccountType from 'types/AccountType';

type AccountContextType = {
  account?: AccountType,
  login: Function,
  logout: Function,
  isLoading: boolean,
  error?: Error,
}

export default AccountContextType;
