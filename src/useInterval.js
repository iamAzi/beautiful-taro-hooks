import Taro from './taro.entry';

const defaultOptions = {
  cancelOnUnmount: true,
};

/**
 * 间隔触发器hook
 * @param fn 间隔触发器的回调函数
 * @param milliseconds 时间间隔
 * @param options 是否在unmount的时候清除
 */
const useInterval = (fn, milliseconds, options = defaultOptions) => {
  const opts = { ...defaultOptions, ...(options || {}) };
  const timeout = Taro.useRef();
  const callback = Taro.useRef(fn);
  const [isCleared, setIsCleared] = Taro.useState(false);

  // the clear method
  const clear = Taro.useCallback(() => {
    if (timeout.current) {
      clearInterval(timeout.current);
      setIsCleared(true);
    }
  }, []);

  // 更新回调函数
  Taro.useEffect(() => {
    if (typeof fn === 'function') {
      callback.current = fn;
    }
  }, [fn]);

  // 更新时间间隔
  Taro.useEffect(() => {
    if (typeof milliseconds === 'number') {
      timeout.current = setInterval(() => {
        callback.current();
      }, milliseconds);
    }
  }, [milliseconds]);

  // 清除定时器
  Taro.useEffect(() => () => {
    if (opts.cancelOnUnmount) {
      clear();
    }
  }, []);

  return [isCleared, clear];
};

export default useInterval;
