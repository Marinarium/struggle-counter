const inputTotal = document.getElementById('total');
const inputCompleted = document.getElementById('completed');
const inputFrequency = document.getElementById('frequency');
const inputAmount = document.getElementById('amount');
const settingsForm = document.getElementById('settings');
const radioType = document.querySelectorAll('input[name="type"]');

const result = document.getElementById('result');
const head = document.getElementById('head');
const remaining = document.getElementById('remaining');

const courseSettingsTemplate = {
    total: null,
    completed: null,
    frequency: null,
    amount: null,
    type: null
};

let courseSettings;

window.addEventListener('load', init);

function init () {
    const storedCourseSettings = localStorage.getItem('courseSettings');

    if (storedCourseSettings) {
        courseSettings = JSON.parse(storedCourseSettings);
        setCourseSettings(courseSettings);
        updateTextResult(courseSettings);
    } else {
        courseSettings = { ...courseSettingsTemplate };
    }

}

function setCourseSettings (settings) {
    inputTotal.value = settings.total;
    inputCompleted.value = settings.completed;
    inputFrequency.value = settings.frequency;
    inputAmount.value = settings.amount;
    setCheckedType(settings.type);
}

function setCheckedType (value) {
    radioType.forEach(radio => {
        if (radio.value === value) {
            radio.checked = true;
        }
    });
}

function updateCheckedType () {
    radioType.forEach(radio => {
        if (radio.checked) {
            courseSettings.type = radio.value;
        }
    });
}

function updateCourseSettings () {
    courseSettings.total = checkPositive(+inputTotal.value, inputTotal);
    courseSettings.completed = checkPositive(+inputCompleted.value, inputCompleted);
    courseSettings.frequency = checkFrequencyPerWeek(+inputFrequency.value, inputFrequency);
    courseSettings.amount = checkPositive(+inputAmount.value, inputAmount);
    updateCheckedType();

    updateTextResult(courseSettings);

    updateLocalStorage('courseSettings', courseSettings);
}

function clearCourseSettings () {
    courseSettings = { ...courseSettingsTemplate };

    updateTextResult(courseSettings);

    updateLocalStorage('courseSettings', courseSettings);
}

function updateLocalStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

settingsForm.addEventListener('input', updateCourseSettings);
settingsForm.addEventListener('reset', clearCourseSettings);

function checkFrequencyPerWeek (frequency, elem) {
    if (frequency > 7) {
        elem.value = 7;
        return 7;
    }

    return frequency;
}

function checkPositive (num, elem) {
    if (num < 0) {
        elem.value = 0;
        return 0;
    }

    return num;
}

function countDays (obj) {
    const week = 7;
    return Math.ceil((obj.total - obj.completed) / obj.amount / obj.frequency * week);
}

function countRemaining (total, completed) {
    return total - completed;
}

function updateTextResult (settings) {
    const {total, amount, completed, frequency, type} = settings;
    const daysResult = countDays(settings);
    const remainingNum = countRemaining(total, completed);

    if (frequency && amount) {
        head.textContent =
            `If ${frequency} ${addGrammaticalNumber(frequency, 'day')} a week for ${amount} ${addGrammaticalNumber(amount, type)} a day...`;
    } else {
        head.textContent = '. . .';
    }

    if (daysResult && isFinite(daysResult)) {
        result.textContent = `It will take you ${daysResult} ${addGrammaticalNumber(daysResult, 'day')} to complete the course!`;
        remaining.textContent = `There are ${remainingNum} ${addGrammaticalNumber(remainingNum, type)} remaining out of ${total}`;
    } else {
        result.textContent = `Calculate how much effort you will need to complete your course!`;
        remaining.textContent = '';
    }
}

function addGrammaticalNumber (num, word) {
    if (num > 1) {
        return /[sx]/.test(word[word.length - 1])
            ? word + 'es'
            : word + 's';
    }

    return word;
}




