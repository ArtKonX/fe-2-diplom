const hoursMinutesFormatted = (value: number) => {
    const date = new Date(value * 1000);

    const hrs = date.getHours();
    const mins = date.getMinutes();

    return `${`0${hrs}`.slice(-2)}:${`0${mins}`.slice(-2)}`;
}

export default hoursMinutesFormatted