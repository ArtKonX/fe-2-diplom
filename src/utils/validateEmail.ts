function validateEmail(email: string) {
    if (typeof email !== 'string') return { valid: false, error: 'Не строка' };
    if (email.length < 6 || email.length > 254) return { valid: false, error: 'Длина от 6 до 254 символов' };
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
    if (!re.test(email)) return { valid: false, error: 'Неверный формат' };
    return { valid: true, error: null };
}

export default validateEmail