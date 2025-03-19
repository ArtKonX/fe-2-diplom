import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import PassengersMain from "../components/PassengersMain/PassengersMain"
import ProgressBar from "../components/ProgressBar/ProgressBar"

const PassengersPage = () => {

    return (
        <>
            <Header page='different' />
            <ProgressBar step={2} />
            <PassengersMain />
            <Footer />
        </>
    )
}

export default PassengersPage