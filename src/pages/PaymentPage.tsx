import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import PaymentMain from "../components/PaymentMain/PaymentMain"
import ProgressBar from "../components/ProgressBar/ProgressBar"

const PaymentPage = () => {

    return (
        <>
            <Header page='different' />
            <ProgressBar step={3} />
            <PaymentMain />
            <Footer />
        </>
    )
}

export default PaymentPage