import React, {useState} from "react";
import './index.css'

function App() {

    const [calc, updateCalc] = useState('');
    const [result, updateResult] = useState('');

    const ops = ['/', '*', '+', '-', '.'];

    function addCalc(value) {
        if (ops.includes(value) && calc === '' || ops.includes(value) && ops.includes(calc.slice(-1))) {
            return;
        }

        updateCalc(calc + value);

        if (!ops.includes(value)) {
            updateResult(eval(calc + value).toString())
        }
    }

    console.log(calc)

    function getFigures() {
        let figures = [];
        for (let i = 1; i <= 10; i++) {
            figures.push(
                <button onClick={() => addCalc(i.toString())} key={i}>{i}</button>
            );
        }
        return figures;
    }

    function getResult() {
        updateCalc(result)
    }

function delCal() {
    if (calc.length > 0) {
        const value = calc.slice(0, -1);
        updateCalc(value);

        if (value === '') {
            updateResult('0');
        } else if (isValidExpression(value)) {
            updateResult(eval(value).toString());
        } else {
            updateResult(''); // Clear the result if the expression is not valid
        }
    }
}

function isValidExpression(expression) {
    try {
        new Function('return ' + expression); // Check if the expression can be parsed
        return true;
    } catch (error) {
        return false;
    }
}


    return (
        <div className="app">
            <div className="calculator">
                <div className="res_container">
                    <div className="calculate_result">
                        <div className="res">({result ? result : '0'})</div>
                        <div className="res_digits">
                            {calc ? calc : '0'}
                        </div>
                    </div>
                </div>

                <div className="calculator_operators">
                    <button onClick={() => addCalc('+')}>+</button>
                    <button onClick={() => addCalc('-')}>-</button>
                    <button onClick={() => addCalc('*')}>*</button>
                    <button onClick={() => addCalc('/')}>/</button>
                    <button onClick={() => delCal()}>DEL</button>
                </div>

                <div className="calculator_numbers">
                    {getFigures()}
                    <button onClick={() => addCalc('.')}>.</button>
                    <button onClick={() => getResult()}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
