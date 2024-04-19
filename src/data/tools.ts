//convert to hh:mm:ss or mm:ss or 0:ss
export const durationToText = (durationSeconds: number): string => {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    if (hours > 0) {
        // Format as hh:mm:ss
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (minutes > 0) {
        // Format as mm:ss
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
        // Format as 0:ss for durations less than a minute
        return `0:${seconds.toString().padStart(2, '0')}`;
    }
};

//convert to Zdays Xhours Ymins or Xhours Ymins or Ymins
export const minutesToTimeText = (minutes: number): string => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;

    if (days > 0) {
        return `${days} days ${hours} hours ${mins} minutes`;
    } else if (hours > 0) {
        return `${hours} hours ${mins} minutes`;
    } else {
        return `${mins} minutes`;
    }
}
