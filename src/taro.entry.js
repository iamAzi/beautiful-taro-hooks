let Taro;
if (process.env.TARO_ENV === 'weapp') {
  Taro = require('@tarojs/taro-weapp')
} else if (process.env.TARO_ENV === 'h5') {
  const apis = require('@tarojs/taro-h5').default;
  Taro = require('@tarojs/taro-h5')
  Taro = { ...Taro, ...apis };
}

export default Taro;
