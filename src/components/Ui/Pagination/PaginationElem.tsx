import styles from './PaginationElem.module.scss';
import { ConfigProvider, Pagination } from 'antd';
import './PaginationElem.scss';

const PaginationElem = ({ current, total, onChange, pageSize }: { current: number, total: number, onChange: (value: number) => void, pageSize: number }) => {

    return (
        <div className={styles["pagination"]}>
            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemActiveBg: '#FFA800',
                            colorText: '#928f94',
                            itemBg: '#fff',
                            fontSize: 40,
                            itemSize: 50,
                            colorBorder: '#928F94',
                            borderRadius: 5,
                            colorBgTextActive: '#928F94',
                        },
                    }
                }}
            >
                <Pagination
                    current={current}
                    total={total}
                    hideOnSinglePage
                    onChange={onChange}
                    showLessItems
                    showSizeChanger={false}
                    pageSize={pageSize}
                />
            </ConfigProvider>
        </div>
    )
}

export default PaginationElem