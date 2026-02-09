// @BetopiaERP-module ignore
// ! WARNING: this module must be loaded after `module_loader` but cannot have dependencies !

(function (BetopiaERP) {
    "use strict";

    if (BetopiaERP.define.name.endsWith("(hoot)")) {
        return;
    }

    const name = `${BetopiaERP.define.name} (hoot)`;
    BetopiaERP.define = {
        [name](name, dependencies, factory) {
            return BetopiaERP.loader.define(name, dependencies, factory, !name.endsWith(".hoot"));
        },
    }[name];
})(globalThis.BetopiaERP);
