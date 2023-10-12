import { countDays, countRemaining, addGrammaticalNumber } from './helpers.js';

export function updateTextResult(settings) {
    const result = document.getElementById('result');
    const head = document.getElementById('head');
    const remaining = document.getElementById('remaining');

    const { total, amount, completed, frequency, type } = settings;
    const daysResult = countDays(settings);
    const remainingNum = countRemaining(total, completed);

    function updateHeadText() {
        if (frequency && amount) {
            head.textContent = `If ${frequency} ${addGrammaticalNumber(frequency, 'day')} a week for ${amount} ${addGrammaticalNumber(amount, type)} a day...`;
        } else {
            head.textContent = '. . .';
        }
    }

    function updateResultAndRemainingText() {
        if (daysResult && isFinite(daysResult)) {
            result.textContent = `It will take you ${daysResult} ${addGrammaticalNumber(daysResult, 'day')} to complete the course!`;
            remaining.textContent = `There are ${remainingNum} ${addGrammaticalNumber(remainingNum, type)} remaining out of ${total}`;
        } else {
            result.textContent = `Calculate how much effort you will need to complete your course!`;
            remaining.textContent = '';
        }
    }

    updateHeadText();
    updateResultAndRemainingText();
}