export const MIN_LOCK_TIME = 10 * 60 * 1000;

export function canUnlock(lockDate: Date) {
    return (lockDate.getTime() + MIN_LOCK_TIME) > Date.now();
}