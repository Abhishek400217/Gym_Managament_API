// Pure helpers for membership-plan duration logic — shared by the Plans module today, and intended for the
// future Add Member form's plan dropdown (via PlansContext) so this logic is never duplicated per-feature.

export const STANDARD_DURATIONS = [1, 2, 3, 4, 6, 12]

export function formatDurationLabel(months) {
    return months === 1 ? '1 Month' : `${months} Months`
}

export function isCustomDuration(months) {
    return !STANDARD_DURATIONS.includes(months)
}

// Always shows standard durations in the fixed 1,2,3,4,6,12 order (skipping any that don't exist yet),
// followed by custom-duration plans sorted ascending by months.
export function sortPlansForDisplay(plans) {
    const standard = STANDARD_DURATIONS
        .map((months) => plans.find((p) => p.months === months))
        .filter(Boolean)
    const custom = plans
        .filter((p) => isCustomDuration(p.months))
        .sort((a, b) => a.months - b.months)
    return [...standard, ...custom]
}