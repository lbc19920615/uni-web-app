import Big from 'big.js';

// 匹配加减乘除括号的正则
const operatorReg = /[()+\-/* ]/g;

/**
 * 将模板处理为 token 数组
 * @param {string} str 要计算的表达式模板
 */
const strToToken = str => {
    // 提取出所有操作数
    const keys = str.split(operatorReg);
    const tokens = [];
    let temp = str;
    // 解析模板
    while (temp.length > 0) {
        // 模板开头是操作数
        if (keys.length > 0 && temp.startsWith(keys[0])) {
            temp = temp.replace(keys[0], '');
            tokens.push(keys.shift());
        }
        // 模板开头是操作符
        else {
            tokens.push(temp[0]);
            temp = temp.substr(1);
        }
    }

    // 把模板里的空白字符都丢掉
    return tokens.filter(token => token && token !== ' ');
}

/**
 * 中缀表达式转换成逆波兰表达式
 * @param {string[]} tokenList 中缀表达式 token 数组
 */
const tokenToRpn = tokenList => {
    if (!tokenList || tokenList.length <= 0) return [];
    const operators = [];

    // 指定操作符优先级是否高于栈中操作符的优先级
    const isTokenHighRank = token => {
        const operatorRand = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const topOperator = operators[operators.length - 1];

        return operators.length === 0 ||
            topOperator === '(' ||
            operatorRand[token] > operatorRand[topOperator];
    }

    const outputs = tokenList.reduce((outputs, token) => {
        // 如果是变量，直接输出
        if (!token.match(operatorReg)) outputs.push(token);
        // 如果是左括号，入操作符栈
        else if (token === '(') operators.push(token);
        // 如果是右括号，把操作符弹出到遇见左括号
        else if (token === ')') {
            while (operators.length > 0) {
                const operator = operators.pop();
                if (operator === '(') break;
                outputs.push(operator);
            }
        }
        // 如果是运算符
        else {
            while (operators.length >= 0) {
                // 把优先级更高的推入结果
                if (isTokenHighRank(token)) {
                    operators.push(token);
                    break;
                }
                outputs.push(operators.pop());
            }
        }

        return outputs;
    }, []);

    return [...outputs, ...operators];
}

/**
 * 运算符到实际操作的映射
 */
const calculators = {
    '+': (num1, num2) => (new Big(num1).plus(num2)),
    '-': (num1, num2) => (new Big(num1).minus(num2)),
    '*': (num1, num2) => (new Big(num1).times(num2)),
    '/': (num1, num2) => (new Big(num1).div(num2))
}

/**
 * 从数据集里获取对应的数据
 */
const getValues = (key, values) => {
    if (!key) return 0;
    if (typeof key === 'string') return values[key] || Number(key) || 0;
    return key;
}

/**
 * 填充并计算数据
 * @param {string[]} tokens rpn token 数组
 * @param {object} values 数据集
 * @returns 最终结果
 */
const calcRpn = function(tokens, values) {
    let numarr = []
    for (const token of tokens) {
        const calculator = calculators[token];

        if (!calculator) numarr.push(token);
        else {
            // 这两个值的创建顺序不能变，否则 pop 出来的值就反了
            const val2 = getValues(numarr.pop(), values);
            const val1 = getValues(numarr.pop(), values);
            const result = calculator(val1, val2);
            numarr.push(result.toNumber());
        }
    }
    return numarr.pop();
};

export const templateCalc = (template, values) => {
    const tokens = strToToken(template)
    const rpn = tokenToRpn(tokens)
    const result = calcRpn(rpn, values)

    return result
}
