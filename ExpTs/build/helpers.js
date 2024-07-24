"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isNodeJS: function (poweredByNodejs, options) {
        if (poweredByNodejs) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
};
