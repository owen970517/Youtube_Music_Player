import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const formDuration = (value:string) => {
    const timeDuration = dayjs.duration(value);
    const minutes = timeDuration.minutes().toString().padStart(2, '0');
    const seconds = timeDuration.seconds().toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

export const formatElapsed = (value:number) => {
    const minute = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}