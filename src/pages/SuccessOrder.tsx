import Footer from "../components/Footer/Footer"
import SuccessOrderHeader from "../components/SuccessOrder/SuccessOrderHeader/SuccessOrderHeader"
import SuccessOrderMain from "../components/SuccessOrder/SuccessOrderMain/SuccessOrderMain"

const SuccessOrderPage = () => {

    return (
        <>
            <SuccessOrderHeader page='success-order' />
            <SuccessOrderMain />
            <Footer />
        </>
    )
}

export default SuccessOrderPage