import { courseSettingsTemplate, loadCourseSettings, saveCourseSettings } from './settings.js';
import { checkFrequencyPerWeek, checkPositive } from './helpers.js';
import { updateTextResult } from './calculations.js';

export function initializeForm() {
    const inputTotal = document.getElementById('total');
    const inputCompleted = document.getElementById('completed');
    const inputFrequency = document.getElementById('frequency');
    const inputAmount = document.getElementById('amount');
    const settingsForm = document.getElementById('settings');
    const radioType = document.querySelectorAll('input[name="type"]');

    let courseSettings = loadCourseSettings();

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

        saveCourseSettings(courseSettings);
    }


    function clearCourseSettings() {
        courseSettings = { ...courseSettingsTemplate };

        updateTextResult(courseSettings);

        saveCourseSettings(courseSettings);
    }

    settingsForm.addEventListener('input', updateCourseSettings);
    settingsForm.addEventListener('reset', clearCourseSettings);
}
