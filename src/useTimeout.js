import Taro from './taro.entry';

/**
 * 本方法用来设置一个定时器
 */

const defaultOptions = {
    cancelOnUnmount: true,
}

/**
 * 定时器hook
 * @param fn 定时回调函数
 * @param milliseconds 定时器时间（毫秒）
 * @param options 是否在unmount的时候清除
 */
const useTimeout = (fn, milliseconds, options = defaultOptions) => {
    const opts = { ...defaultOptions, ...(options || {}) };
    const timeout = Taro.useRef();
    const callback = Taro.useRef(fn);
    const [isCleared, setIsCleared] = Taro.useState(false);

    // 清除方法
    const clear = Taro.useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            setIsCleared(true);
        }
    }, []);

    // 监听回调的变化
    Taro.useEffect(() => {
        if (typeof fn === 'function') {
            callback.current = fn;
        }
    }, [fn]);

    // 监听定时器时间变化
    Taro.useEffect(() => {
        if (typeof milliseconds === 'number') {
            timeout.current = setTimeout(() => {
                callback.current();
            }, milliseconds);
        }
    }, [milliseconds]);

    // unmount的时候是否清除
    Taro.useEffect(() => () => {
        if (opts.cancelOnUnmount) {
            clear();
        }
    }, []);

    return [isCleared, clear];
}

export default useTimeout;