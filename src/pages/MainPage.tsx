import Header from "../components/Header/Header"
import AboutUs from "../components/AboutUs/AboutUs"
import Work from "../components/Work/Work"
import Feedbacks from "../components/Feedbacks/Feedbacks"
import Footer from "../components/Footer/Footer"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import PopUpWindow from "../components/PopUpWindows/PopUpWindow/PopUpWindow"

const MainPage = () => {

    const fetchTrains = useSelector((state: { fetchTrains: { status: {fields: boolean, subscribe: boolean, double: boolean}, render: boolean } }) => state.fetchTrains);

    const [popUpStatus, setPopUpStatus] = useState<{ [key in string]: boolean }>({ 'fields': false, 'subscribe': false, 'double': false });

    useEffect(() => {
        setPopUpStatus({ 'fields': fetchTrains.status['fields'], 'subscribe': fetchTrains.status['subscribe'], 'double': fetchTrains.status['double'] })
    }, [fetchTrains.render, fetchTrains.status])

    return (
        <>
            {popUpStatus['double'] && <PopUpWindow statusName='double' typePopUp='info' errorTitle='Одинаковые направления!' errorMessage='Поля "Откуда" и "Куда" должны отличаться!' setStatus={setPopUpStatus} />}
            {popUpStatus['fields'] && <PopUpWindow statusName='fields' typePopUp='error' errorTitle='Не все поля заполнены(' errorMessage='Поля "Откуда" и "Куда" обязательны к заполению!' setStatus={setPopUpStatus} />}
            {popUpStatus['subscribe'] && <PopUpWindow statusName='subscribe' typePopUp='info' errorTitle='Вы подписаны!' errorMessage='Теперь Вы в курсе событий!' setStatus={setPopUpStatus} />}
            <Header page='main' />
            <AboutUs />
            <Work />
            <Feedbacks />
            <Footer />
        </>
    )
}

export default MainPage