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

    const repeatOnePriority = (x) => {
        for (let i = 0; i < x.length; ) {

            if ( x[i+1] === '*' && x[i+2] !== '(' && x[i] !== ')' && x[i-1] !== '*' && x[i-1] !== '/' ||
                x[i+1] === '/' && x[i+2] !== '(' && x[i] !== '(' && x[i-1] !== '*' && x[i-1] !== '/' ) { 

                y = methods[x[i+1]](x[i], x[i+2]);
                x.splice(i, 3, y );
                i = 0;
            } else if (x[i] === '(' && x[i+2] === ')') {
                x.splice(i, 3, x[i+1] );
                i = 0;
            } else {i++}
        }
    }

    const repeatTwoPriority = (x) => {
        for (let i = 0; i < x.length; ) {

            if ( x[i+1] === '+' && x[i+2] !== '(' && x[i] !== ')' && x[i-1] !== '*' && x[i-1] !== '/' && x[i-1] !== '+' && x[i-1] !== '-'|| 
                 x[i+1] === '-' && x[i+2] !== '(' && x[i] !== '(' && x[i-1] !== '*' && x[i-1] !== '/' && x[i-1] !== '+' && x[i-1] !== '-' ) { 
                
                y = methods[x[i+1]](+x[i], +x[i+2]);
                x.splice(i, 3, y );
                i = 0;
            } else if (x[i] === '(' && x[i+2] === ')') {
                x.splice(i, 3, x[i+1] );
                i = 0;
            } else {i++}
        }
    }

    // repeatOnePriority(x);
    // repeatTwoPriority(x)
    // repeatOnePriority(x);
    // repeatTwoPriority(x)
    // repeatOnePriority(x);
    // repeatTwoPriority(x)
    

    for (let i = 0; i < x.length; i++) {
        repeatOnePriority(x);
        repeatTwoPriority(x);

        // if (x.length > 2) {i=0}
        if (x.length === 1) {
            result = x[0];
            console.log(result)
            return result;
        } else { i++ }
    }

    let q = x.join('')
    console.log(expStr)
    console.log(q)
    console.log(x)
}


expressionCalculator(" 59 - 13 + (  25 * 22 / (  47 / 38 * (  64 / 93 - 91 + 72  ) * 66  ) + 43 - 5  ) * 39 / 55 ")
expressionCalculator(" (  96 / 83 - 53 - (  59 - 91 / 91 - 54  )  ) / (  75 + 4 / (  50 - 80 * 45 + 93 + 18  ) - 76 / 54  ) * 14 + 59  ")


module.exports = {
    expressionCalculator
}