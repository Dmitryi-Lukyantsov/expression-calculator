function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let result = 0;
    let bracOpen = 0;
    let bracClose = 0;
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
        if (brac === '(') bracOpen++;
        if (brac === ')') bracClose++;

    }
    
    if (bracOpen !== bracClose) {
        throw new Error("ExpressionError: Brackets must be paired")
    }

    if (expr.length === 3) {
        result = methods[expr[1]](+expr[0], +expr[2]);
        infin(result); // подумать
        return result;
    }

    for (let i = 0; i < x.length; ) {

        if (x[i] === '(' && x[i+2] === ')') {
            x.splice(i, 3, x[i+1] );
            i = 0;
        } else if ( x[i+1] === '*' && x[i+2] !== '(' && x[i] !== ')' ||
                    x[i+1] === '/' && x[i+2] !== '(' && x[i] !== '(') { 

                    y = methods[x[i+1]](x[i], x[i+2]);
                    x.splice(i, 3, y );
                    i = 0;
        } else {i++}
    }

    for (let i = 0; i < x.length; ) {
        if (x[i] === '(' && x[i+2] === ')') {
        x.splice(i, 3, x[i+1] );
        i = 0;
        } else if ( x[i+1] === '+' && x[i+2] !== '(' && x[i] !== ')' ||
             x[i+1] === '-' && x[i+2] !== '(' && x[i] !== '(') { 
            
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

    
console.log(expStr)
    console.log(x)
}


expressionCalculator(" 59 - 13 + (  25 * 22 / (  47 / 38 * (  64 / 93 - 91 + 72  ) * 66  ) + 43 - 5  ) * 39 / 55 ")
expressionCalculator(" 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) ")


module.exports = {
    expressionCalculator
}