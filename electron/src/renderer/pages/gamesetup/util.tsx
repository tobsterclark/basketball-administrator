export function formatHHMMtime(time: Date) {
    const minutes = time.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${time.getHours()}:${formattedMinutes}`;
}
