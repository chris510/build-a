import { generateCalculatorNums, calculatorOperations } from './calculator.utils';

describe('Generating the calculator buttons', () => {
    const buttons = generateCalculatorNums();
    it ('Generates a 1-9 number list', () => {
        expect(buttons).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(buttons.length).toEqual(9);
    })

    it ('Returns to us a non-empty list', () => {
        expect(Array.isArray(buttons)).toEqual(true);
        expect(buttons.length).not.toEqual(0);
    })
})

describe('Calculator operations are properly handled', () => {

    it ('Handles two numbers adding properly', () => {
        const additionOp = calculatorOperations['+'](1, 2);
        expect(additionOp).toEqual(3);
        expect(calculatorOperations['+'](3, 2)).toEqual(5);
    })

    it ('Handles two subtracting adding properly', () => {
        const subtractionOp = calculatorOperations['-'](2, 1);
        expect(subtractionOp).toEqual(1);
        expect(calculatorOperations['-'](5, 3)).toEqual(2);
    })

    it ('Handles two multiplying adding properly', () => {
        const multiplyOp = calculatorOperations['*'](2, 2);
        expect(multiplyOp).toEqual(4);
        expect(calculatorOperations['*'](9, 2)).toEqual(18);
    })

    it ('Handles two dividing adding properly', () => {
        expect(calculatorOperations['/'](2, 2)).toEqual(1);
        expect(calculatorOperations['/'](1, 2)).toEqual(0.5);
        expect(calculatorOperations['/'](20, 2)).toEqual(10);
    })

    it ('Handles the operation of two strings properly', () => {
        const operation = calculatorOperations['+']('5', '5')
        expect(calculatorOperations['+']('1', '1')).toEqual(2);
        expect(calculatorOperations['-']('2', '1')).toEqual(1);
        expect(calculatorOperations['*']('10', '10')).toEqual(100);
        expect(calculatorOperations['/']('10', '10')).toEqual(1);
        expect(typeof operation).toBe('number')
        expect(typeof operation).not.toBe('string')
    })
});