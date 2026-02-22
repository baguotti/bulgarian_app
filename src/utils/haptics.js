export const hapticPatterns = {
    light: [60],
    medium: [100],
    success: [50, 70, 50],
    error: [120, 60, 120, 60, 120],
    strong: [300]
};

/**
 * Centered haptic feedback trigger
 * @param {keyof typeof hapticPatterns} type 
 */
export const triggerHaptic = (type = 'light') => {
    try {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            const pattern = hapticPatterns[type] || hapticPatterns.light;

            // Some devices need a "nudge" or reset
            navigator.vibrate(0);

            const success = navigator.vibrate(pattern);

            if (!success) {
                console.warn(`Vibration API returned false for pattern: ${pattern}. Device might be in Battery Saver mode or vibration is disabled in System Settings.`);
            }
            return success;
        } else {
            if (!window.__vibrate_api_missing) {
                console.error('Vibration API (navigator.vibrate) is not available in this browser.');
                window.__vibrate_api_missing = true;
            }
        }
    } catch (e) {
        console.error('Haptic Execution Error:', e);
    }
    return false;
};
