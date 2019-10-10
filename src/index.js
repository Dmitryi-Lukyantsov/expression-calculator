function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let result = 0;
    let bracOpen = 0;
    let bracClose = 0;
    let arrBrac = [];
    let x = [];

    let expArr = expr.split(' ');
    expArr.forEach(el => {
        if (el !== '') x.push(el);
    });
    
    const methods = {
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    }

    const infin = result => {
        if (result === Infinity) {
            throw new Error ('TypeError: Division by zero.');
        }
    }

    for (let i = 0; i < x.length; i++) {
        if (x[i] === '/' && x[i+1] === "0") {
            throw new Error ('TypeError: Division by zero.');
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
        infin(result); 
        return result;
    }
    
    const funsBrac = (arr) => {
        let number = 0;

        for (let i = 0; i < arr.length; ) {
            if (arr[i] === '*' || arr[i] === '/') { 
                number = methods[arr[i]](arr[i-1], arr[i+1]);
                arr.splice(i-1, 3, number);
                i = 0;
                
            }  else {i++}
        }

        for (let i = 0; i < arr.length; ) {

            if (arr[i] === '+' || arr[i] === '-') {
                number = methods[arr[i]](+arr[i-1], +arr[i+1]);
                arr.splice(i-1, 3, number);
                i = 0;
            }  else {i++}
        }

        return number;
    }

    let posOpen;
    let count = 0;
    let res;
    for (let i = 0; i < x.length; ) {
        
        if (x[i] === '(' && x[i+1] !== '(') {
            posOpen = i;
            arrBrac = [];
            count = 0;
            i++;
        }

        arrBrac.push(x[i]);
        count++ 

        if (x[i+1] === ')') {
            res = funsBrac(arrBrac);
            x.splice(posOpen, count+2, res)
            count = 0;
            arrBrac = [];
            i = 0;
        } else if (x.indexOf('(') === -1) {
            i++;
            break
        } else { i++ }
    }


    res = funsBrac(x)
    
    return res
}


module.exports = {
    expressionCalculator
}