import { useEffect, useState } from 'react';
import styles from './LastTickets.module.scss';
import LastTicket from './LastTicket/LastTicket';

const LastTickets = () => {

    const [data, setData] = useState<TrainCardProps[] | null>(null);

    useEffect(() => {
        fetch('https://students.netoservices.ru/fe-diplom/routes/last')
            .then(response => response.json()
                .then(data => { setData(data) })
            );
    }, [])

    if (!data) return <p className={styles['loading']}>Loading...</p>

    return (
        <div className={styles["last-tickets"]}>
            <h3 className={styles["last-tickets__title"]}>последние билеты</h3>
            <ul className={styles["last-tickets__list"]}>
                {data.slice(-3).map(ticket => (
                    <li key={ticket.departure.id} className={styles['last-ticket-elem']}>
                        <LastTicket ticket={ticket} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LastTickets