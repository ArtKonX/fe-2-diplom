import { useSelector } from "react-redux"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import PopUpWindow from "../components/PopUpWindows/PopUpWindow/PopUpWindow"
import ProgressBar from "../components/ProgressBar/ProgressBar"
import TrainSelectionMainPart from "../components/TrainSelectionMainPart/TrainSelectionMainPart"
import { useEffect, useState } from "react"


const TrainSelection = () => {

    const fetchTrains = useSelector((state: { fetchTrains: { status: {[key in string]: boolean}, render: boolean, loading: boolean, isTotalCount: boolean, trains: TrainCardProps } }) => state.fetchTrains);

    const [popUpStatus, setPopUpStatus] = useState<{ [key in string]: boolean }>({ 'fields': false, 'double': false });

    useEffect(() => {
        setPopUpStatus({ 'fields': fetchTrains.status['fields'], 'double': fetchTrains.status['double'] })
    }, [fetchTrains.render, fetchTrains.status])

    return (
        <>
            {popUpStatus['double'] && <PopUpWindow statusName='double' typePopUp='info' errorTitle='Одинаковые направления!' errorMessage='Поля "Откуда" и "Куда" должны отличаться!' setStatus={setPopUpStatus} />}
            {popUpStatus['fields'] && <PopUpWindow statusName='fields' typePopUp='error' errorTitle='Не все поля заполнены(' errorMessage='Поля "Откуда" и "Куда" обязательны к заполению!' setStatus={setPopUpStatus} />}
            <Header page='different' />
            <ProgressBar step={1} />
            <TrainSelectionMainPart />
            <Footer />
        </>
    )
}

export default TrainSelection