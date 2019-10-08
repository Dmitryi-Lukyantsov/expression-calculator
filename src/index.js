function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let result = 0;
    let brackets = 0;
    let x = [];
    let y = 0;

    let expArr = expr.split(' ');
    expArr.forEach(el => {
        if (el !== '') x.push(el);
    });

    let expStr = x.join('');
    
    
    const methods = {
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    }

    const infin = result => {
        if (result === Infinity) {
            throw new Error ('TypeError: Devision by zero.');
        }
    }

    for (let i = 0; i < expr.length; i++) {
        const brac = expr[i];
        if (brac === '(') brackets++;
        if (brac === ')') brackets--;

        if (brackets !== 0) {
            throw new Error("ExpressionError: Brackets must be paired")
        }
    }

    if (expr.length === 3) {
        result = methods[expr[1]](+expr[0], +expr[2]);
        if (result === Infinity) {
            throw new Error ("TypeError: Devision by zero.");
        };
        return result;
    }

    for (let i = 0; i < x.length; ) {
        if ( x[i+1] === '*' && x[i+2] !== '(' || x[i+1] === '/' && x[i+2] !== '(') { 
            y = methods[x[i+1]](x[i], x[i+2]);
            x.splice(i, 3, y );
            i = 0;
        } else {i++}
    }

    for (let i = 0; i < x.length; ) {
        if ( x[i+1] === '+' && x[i+2] !== '(' || x[i+1] === '-' && x[i+2] !== '(') { 
            y = methods[x[i+1]](+x[i], +x[i+2]);
            x.splice(i, 3, y );
            i = 0;
        } else {i++}
    }

    for (let i = 0; i < x.length; i++) {
        if (x.length === 1) {
            result = x[0];
            console.log(result)
            return result;
        }
    }

    // console.log(expStr)
    // console.log(x)
}

module.exports = {
    expressionCalculator
}