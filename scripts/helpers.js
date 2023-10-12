export function countDays(obj) {
    const week = 7;
    return Math.ceil((obj.total - obj.completed) / obj.amount / obj.frequency * week);
}

export function countRemaining(total, completed) {
    return total - completed;
}

export function addGrammaticalNumber(num, word) {
    if (num > 1) {
        return /[sx]/.test(word[word.length - 1]) ? word + 'es' : word + 's';
    }
    return word;
}

export function checkPositive (num, elem) {
    if (num < 0) {
        elem.value = 0;
        return 0;
    }

    return num;
}

export function checkFrequencyPerWeek (frequency, elem) {
    if (frequency > 7) {
        elem.value = 7;
        return 7;
    }

    return frequency;
}