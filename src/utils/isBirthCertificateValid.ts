function isBirthCertificateValid(certificate: string | undefined) {
    const regex = /^[IVX]+-[А-Я]{2}-\d{6}$/i

    if (certificate) return regex.test(certificate);
}

export default isBirthCertificateValid