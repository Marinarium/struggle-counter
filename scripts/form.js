import { courseSettingsTemplate, loadCourseSettings, saveCourseSettings } from './settings.js';
import { checkFrequencyPerWeek, checkPositive } from './helpers.js';
import { updateTextResult } from './calculations.js';

function setCourseSettings (settings, inputTotal, inputCompleted, inputFrequency, inputAmount, radioType) {
    inputTotal.value = settings.total;
    inputCompleted.value = settings.completed;
    inputFrequency.value = settings.frequency;
    inputAmount.value = settings.amount;
    setCheckedType(settings.type, radioType);
}

function updateCourseSettings(courseSettings, inputTotal, inputCompleted, inputFrequency, inputAmount, radioType) {
    courseSettings.total = checkPositive(+inputTotal.value, inputTotal);
    courseSettings.completed = checkPositive(+inputCompleted.value, inputCompleted);
    courseSettings.frequency = checkFrequencyPerWeek(+inputFrequency.value, inputFrequency);
    courseSettings.amount = checkPositive(+inputAmount.value, inputAmount);
    updateCheckedType(radioType, courseSettings);
    updateTextResult(courseSettings);
    saveCourseSettings(courseSettings);
}

function clearCourseSettings(courseSettings, courseSettingsTemplate) {
    courseSettings = { ...courseSettingsTemplate };
    updateTextResult(courseSettings);
    saveCourseSettings(courseSettings);
}

function setCheckedType (value, radioType) {
    radioType.forEach(radio => {
        if (radio.value === value) {
            radio.checked = true;
        }
    });
}

function updateCheckedType(radioType, courseSettings) {
    radioType.forEach((radio) => {
        if (radio.checked) {
            courseSettings.type = radio.value;
        }
    });
}

export function initializeForm() {
    const inputTotal = document.getElementById('total');
    const inputCompleted = document.getElementById('completed');
    const inputFrequency = document.getElementById('frequency');
    const inputAmount = document.getElementById('amount');
    const settingsForm = document.getElementById('settings');
    const radioType = document.querySelectorAll('input[name="type"]');

    let courseSettings = loadCourseSettings();

    setCourseSettings(courseSettings, inputTotal, inputCompleted, inputFrequency, inputAmount, radioType);

    updateTextResult(courseSettings);

    settingsForm.addEventListener('input', () => {
        updateCourseSettings(courseSettings, inputTotal, inputCompleted, inputFrequency, inputAmount, radioType);
    });

    settingsForm.addEventListener('reset', () => {
        clearCourseSettings(courseSettings, courseSettingsTemplate);
    });
}
