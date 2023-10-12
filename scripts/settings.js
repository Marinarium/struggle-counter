export const courseSettingsTemplate = {
    total: null,
    completed: null,
    frequency: null,
    amount: null,
    type: null
};

export function loadCourseSettings() {
    const storedCourseSettings = localStorage.getItem('courseSettings');
    return storedCourseSettings ? JSON.parse(storedCourseSettings) : { ...courseSettingsTemplate };
}

export function saveCourseSettings(settings) {
    localStorage.setItem('courseSettings', JSON.stringify(settings));
}
