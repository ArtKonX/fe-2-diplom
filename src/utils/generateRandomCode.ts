function generateRandomCodeOrder() {

    const digits = '0123456789';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let result = '';

    for(let i = 0; i < 3; i++) {
        result += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    for(let i = 0; i < 2; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return result;
}

export default generateRandomCodeOrder