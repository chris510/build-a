import { useState } from 'react';
import numeral from 'numeral';
import { generateCalculatorNums, calculatorOperations } from './calculator.utils';
import Button from '../button/button';

const OPERATIONS = ['+', '-', '*', '/'];
const MISC = ['clear', 'delete', '='];

const Calculator = () => {
    const [firstVal, setFirstVal] = useState('');
    const [secondVal, setSecondVal] = useState('');
    const [mathOperation, setMathOperation] = useState('');
    const [newResult, setNewResult] = useState('');
    const [savedResults, setSavedResults] = useState([]);
    const [wholeCalculation, setWholeCalculation] = useState('');

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
        setNewResult(result)
        cacheResults(result);
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
            return setSecondVal(secondVal.slice(0, secondVal.length - 1));
        } else if (mathOperation) {
            return setMathOperation('');
        } else if (firstVal) {
            const firstValLen = firstVal.length;
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
                    <Button
                        key={idx}
                        handleOnClick={() => setVal(num)}
                        text ={num}
                    />
                ))}
            </div>
            <div className="calculator__op-btns">
                {OPERATIONS.map((operation, idx) => (
                    <Button
                        key={idx}
                        handleOnClick={() => setMathOperation(operation)}
                        text={operation}
                    />
                ))}
            </div>
            <div className="calculator__misc-btns">
                {MISC.map((misc, idx) => (
                    <Button
                        key={idx}
                        handleOnClick={() => performMiscOperation(misc)}
                        text={misc}
                    />
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