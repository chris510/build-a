import { useState, useEffect } from 'react';
import './calculator.scss';
import numeral from 'numeral';

const OPERATIONS = ['+', '-', '*', '/'];
const MISC = ['clear', 'delete', '='];
const generateCalculatorNums = () => {
    const nums = [];
    for (let i = 1; i <= 9; i++) {
        nums.push(i);
    }
    return nums;
}

const calculatorOperations = {
    '+': (firstVal, secondVal) => firstVal + secondVal,
    '-': (firstVal, secondVal) => firstVal - secondVal,
    '*': (firstVal, secondVal) => firstVal * secondVal,
    '/': (firstVal, secondVal) => numeral(firstVal / secondVal).format('(.00)'),
}

// const useThrottle = (value, delay) => {
//     const [throttledEvent, setThrottledEvent] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             console.log('hellooo', value);
//             setThrottledEvent(value);
//         }, delay)
//         return () => {
//             clearTimeout(handler)
//         };
//     }, [value, delay])
//     return throttledEvent;
// }

const Calculator = () => {
    const [firstVal, setFirstVal] = useState('');
    const [secondVal, setSecondVal] = useState('');
    const [mathOperation, setMathOperation] = useState('');
    // const [miscOperation, setMiscOperation] = useState('');
    const [newResult, setNewResult] = useState('');
    const [savedResults, setSavedResults] = useState([]);
    const [wholeCalculation, setWholeCalculation] = useState('');
    // const clickEventOp = useThrottle(miscOperation, 1000);
    // useEffect(() => {
    //     if (clickEventOp) {
    //         performMiscOperation(clickEventOp);
    //     }
    // }, [clickEventOp])

    const setVal = (num) => !mathOperation ? setFirstVal(firstVal + num) : setSecondVal(secondVal + num);

    const cacheResults = (result) => {
        const newResults = savedResults.length < 5 ? [result, ...savedResults] : [result, ...savedResults.slice(0, savedResults.length - 1)];
        setSavedResults(newResults);
    };

    const performMathOperation = () => {
        const result = calculatorOperations[mathOperation](
            numeral(firstVal).value(),
            numeral(secondVal).value()
        );
        setWholeCalculation(firstVal + mathOperation + secondVal);
        cacheResults(result);
        setNewResult(result)
        setFirstVal(result);
        setMathOperation('');
        setSecondVal('');
    };

    const performMiscOperation = (miscBtn) => {
        if (miscBtn === 'clear') {
            clearAllCalcs();
        } else if (miscBtn === 'delete') {
            deleteCalc();
        } else if (miscBtn === '=' && firstVal && secondVal) {
            performMathOperation();
        }
    }

    const clearAllCalcs = () => {
        if (firstVal) setFirstVal('');
        if (secondVal) setSecondVal('');
        if (mathOperation) setMathOperation('');
        if (newResult) setNewResult('');
        if (wholeCalculation) setWholeCalculation('');
    }

    const deleteCalc = () => {
        if (secondVal) {
            // setMiscOperation('');
            return setSecondVal(secondVal.slice(0, secondVal.length - 1));
        } else if (mathOperation) {
            return setMathOperation('');
        } else if (firstVal) {
            const firstValLen = firstVal.length;
            // setMiscOperation('');
            return setFirstVal(firstValLen === 1 ? '' : firstVal.slice(0, firstValLen - 1));
        }
    }

    return (
        <div className="calculator">
            <div className="calculator__output">
                <div>
                    <span>{firstVal}</span>
                    <span>{mathOperation}</span>
                    <span>{secondVal}</span>
                </div>
                <h2 className="calculator__result">{newResult}</h2>
                <div className="calculator__history">{wholeCalculation}</div>
            </div>
            <div className="calculator__num-btns">
                {generateCalculatorNums().map((num, idx) => (
                    <button
                        key={idx}
                        onClick={() => setVal(num)}
                    >
                        {num}
                    </button>
                ))}
            </div>
            <div className="calculator__op-btns">
                {OPERATIONS.map((operation, idx) => (
                    <button
                        key={idx}
                        onClick={() => setMathOperation(operation)}
                    >
                        {operation}
                    </button>
                ))}
            </div>
            <div className="calculator__misc-btns">
                {MISC.map((misc, idx) => (
                    <button
                        key={idx}
                        onClick={() => performMiscOperation(misc)}
                    >
                        {misc}
                    </button>
                ))}
            </div>
            <ul className="calculator__saved-results">
                    {savedResults.map((res, idx) => (
                        <li
                            key={idx}
                        >
                            {res}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Calculator;