const secondsToFormattedTime = (value: number) => {
    const hrs = Math.floor(value / (60 * 60));
    const mins = Math.floor((value - hrs * (60 * 60)) / 60);

    return `${`${hrs}`}:${`0${mins}`.slice(-2)}`;
};

export default secondsToFormattedTime