export default {
    isNodeJS: function (poweredByNodejs: boolean, options: any) {
      if (poweredByNodejs) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  };
  