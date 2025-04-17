import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../typings/filterOptions';

export const dataCategories: (HAND_TOOLS | POWER_TOOLS | OTHER | CATEGORIES)[][] =
    [
        [POWER_TOOLS.SANDER],
        [POWER_TOOLS.SANDER, POWER_TOOLS.DRILL],
        [CATEGORIES.POWER_TOOLS],
    ];