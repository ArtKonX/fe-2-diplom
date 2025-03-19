import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import ProgressBar from "../components/ProgressBar/ProgressBar"
import SelectionPlacesMainPart from "../components/SelectionPlacesMainPart/SelectionPlacesMainPart"

const SelectionPlaces = () => {

    return (
        <>
            <Header page='different' />
            <ProgressBar step={1} />
            <SelectionPlacesMainPart />
            <Footer />
        </>
    )
}

export default SelectionPlaces