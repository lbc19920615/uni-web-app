
import gt from "lodash/gt";
import lt from "lodash/lt";
import eq from "lodash/eq";

let funMap = {
    gt,
    lt,
    eq
}

export function con(item, index, key, funName, ...args) {
    let fun = funMap[funName];
    // console.log(funName, args);
    return fun(_.get(item, key), ...args);
}


export function findAll(items: Array<any>, conditions = []) {
    return items.filter(function (item, index) {
        return conditions.every((condition) => {
            return con(item, index, ...condition.slice(0));
        });
    });
}