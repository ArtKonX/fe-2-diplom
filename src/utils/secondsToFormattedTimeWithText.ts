const secondsToFormattedTimeWithText = (value: number) => {
    const hrs = Math.floor(value / (60 * 60));
    const mins = Math.floor((value - hrs * (60 * 60)) / 60);
    let hrsText;
    let minsText;

    switch (`0${hrs}`.slice(-1)) {
        case '1':
            hrsText = 'час';
            break;
        case '2':
        case '3':
        case '4':
            hrsText = 'часа';
            break;
        default:
            hrsText = 'часов';
    }

    switch (`0${mins}`.slice(-1)) {
        case '1':
            minsText = 'минута';
            break;
        case '2':
        case '3':
        case '4':
            minsText = 'минуты';
            break;
        default:
            minsText = 'минут';
    }

    return { hrs: `${hrs} ${hrsText}`, mins: `${mins} ${minsText}` };
}

export default secondsToFormattedTimeWithText