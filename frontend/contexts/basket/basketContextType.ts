import { KeyedMutator } from 'swr';

import BasketType from 'types/BasketType';

interface BasketContextType {
  basket: BasketType,
  error: any,
  isLoading: boolean,
  setDomain: Function,
  getBasket: KeyedMutator<BasketType[]>,
  updateBasket: Function,
  deleteBasket: Function,
}

export default BasketContextType;
