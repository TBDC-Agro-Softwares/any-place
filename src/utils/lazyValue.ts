// This piece of code was orignally written by sindresorhus and can be seen here
// https://github.com/sindresorhus/lazy-value/blob/master/index.js

export default (fn: any) => {
  let called = false;
  let ret: any;

  return () => {
    if (!called) {
      called = true;
      ret = fn();
    }

    return ret;
  };
};
