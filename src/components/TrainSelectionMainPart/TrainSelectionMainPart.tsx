import Filters from './Filters/Filters';
import PaginationElem from '../Ui/Pagination/PaginationElem';
import SideBarTickets from '../SideBarTickets/SideBarTickets';
import TrainCards from './TrainCards/TrainCards';
import styles from './TrainSelectionMainPart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addOffSet, fetchTrainsByOption } from '../../redux/slices/fetchTrainsSlice';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

interface Date {
    from?: string,
    to?: string
}

interface Directions {
    from?: string,
    to?: string
}

interface FetchTrainsState {
    date: Date[],
    limit: number,
    render: boolean,
    directions: Directions[],
    options: Option[],
    trains: TrainCardProps,
    loading: boolean,
    url: string,
    error: string
}

interface Option {
    option: string,
    status: string | boolean | number
}

const TrainSelectionMainPart = () => {

    const trainsData = useSelector((train: { fetchTrains: FetchTrainsState }) => train.fetchTrains)

    const [total, setTotal] = useState<number>(trainsData.trains.total_count && trainsData.limit ? Math.ceil(trainsData.trains.total_count / trainsData.limit) : 3);

    useEffect(() => {
        setTotal(Math.ceil(trainsData.trains.total_count / trainsData.limit))

    }, [trainsData.trains, trainsData.limit, ])

    const limit = 1;

    const [currentPage, setCurrentPage] = useState<number>(1);

    const dispatch = useDispatch<AppDispatch>();

    const onChangePage = (value: number) => {

        setCurrentPage(value);
        dispatch(addOffSet({ offset: value }));
        dispatch(fetchTrainsByOption());
    };

    if (!trainsData.trains.total_count) return <Loader />

    return (
        <div className={`${styles['main-part']} ${styles['main-part-container']}`}>
            <div className={styles["sidebar-and-last-tickets"]}>
                <SideBarTickets />
            </div>
            <div className={styles['main-content']}>
                <Filters />
                <TrainCards/>
                <PaginationElem
                    current={currentPage}
                    onChange={onChangePage}
                    total={total}
                    pageSize={limit}
                />
            </div>
        </div>
    )
}

export default TrainSelectionMainPart