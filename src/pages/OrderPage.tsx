import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import OrderMain from "../components/OrderMain/OrderMain"
import ProgressBar from "../components/ProgressBar/ProgressBar"

const OrderPage = () => {

    return (
        <>
            <Header page='different' />
            <ProgressBar step={4} />
            <OrderMain />
            <Footer />
        </>
    )
}

export default OrderPage