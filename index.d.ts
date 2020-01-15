import { EffectCallback } from '@tarojs/taro'

type TimeoutOrIntervalOpts = {
  cancelOnUnmount: boolean,
}

export declare const useTimeout: (fn: Function, milliseconds: number, options?: TimeoutOrIntervalOpts) => [boolean, EffectCallback];

export declare const useInterval: (fn: Function, milliseconds: number, options?: TimeoutOrIntervalOpts) => [boolean, EffectCallback];