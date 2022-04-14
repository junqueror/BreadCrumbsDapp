import { useEffect, useState } from 'react';

const TIME_INTERVAL = 20; // miliseconds

const useIncrementalCounter = (initialValue: number = 0, endValue: number = 100): number => {
  const [value, setValue] = useState<number>(initialValue);
  const reverse = initialValue > endValue;

  useEffect(() => {
    if (!reverse) {
      if (endValue > value) setTimeout(() => setValue(value + 1), TIME_INTERVAL);
      if (endValue < value) setTimeout(() => setValue(value - 1), TIME_INTERVAL);
    } else {
      if (endValue < value) setTimeout(() => setValue(value - 1), TIME_INTERVAL);
      if (endValue > value) setTimeout(() => setValue(value + 1), TIME_INTERVAL);
    }
  }, [endValue, value, reverse]);

  return value;
};

export default useIncrementalCounter;
