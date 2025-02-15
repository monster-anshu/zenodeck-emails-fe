/* eslint-disable @typescript-eslint/no-explicit-any */
type ThrottleFunction = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
) => (...args: Parameters<T>) => void;

export const throttle: ThrottleFunction = (func, limit) => {
  let inThrottle: boolean;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

type DebounceFunction = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => (...args: Parameters<T>) => void;

export const debounce: DebounceFunction = (func, delay) => {
  let timeoutId: NodeJS.Timeout;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
