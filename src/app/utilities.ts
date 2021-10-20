import { format } from "date-fns";

export const formateDate = (value: string): string => {
    if (!value) return ""
    try {
        const date = new Date(value);
        return format(date, 'MMM-dd-yyyy');
    } catch (_) {
        const date = new Date(value);
        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    }
};
export const formatTime = (s: number): string => {
    try {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        return mins + ':' + secs;
    } catch (_) {
        return `value`;
    }
};

const pad = (i: number) => ('0' + i).slice(-2);

export const millisToMinutesAndSeconds = (millis: number) => {
    const d = new Date(1000 * Math.round(millis / 1000));
    const hours = d.getUTCHours()
    const hs = hours !== 0 ? pad(hours) + ':' : ''
    const minuteString = pad(d.getUTCMinutes()) + ':'
    const secondsString = pad(d.getUTCSeconds());
    return hs + minuteString + secondsString;
}

export const secondsToMinutesAndSeconds = (s: number) => {
    let minutes = Math.floor(s / 60);
    const seconds = s - minutes * 60;
    const hours = Math.floor(minutes / 3600);
    minutes = minutes - hours * 3600;
    var finalTime = pad(minutes) + ':' + pad(seconds);
    return finalTime;
}