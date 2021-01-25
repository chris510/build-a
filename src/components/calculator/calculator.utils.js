export const generateCalculatorNums = () => {
    const nums = [];
    for (let i = 1; i <= 9; i++) {
        nums.push(i);
    }
    return nums;
}

export const calculatorOperations = {
    '+': (firstVal, secondVal) => parseInt(firstVal) + parseInt(secondVal),
    '-': (firstVal, secondVal) => parseInt(firstVal) - parseInt(secondVal),
    '*': (firstVal, secondVal) => parseInt(firstVal) * parseInt(secondVal),
    '/': (firstVal, secondVal) => parseInt(firstVal) / parseInt(secondVal),
}