import { put, spawn, retry, takeLatest } from 'redux-saga/effects';
import apiRequests from '../../api/apiRequests';
import { fetchTrains } from '../slices/fetchTrainsSlice';
import { TakeableChannel } from 'redux-saga';

interface HandleGetIdCity {
    meta: {
        arg: {
            from: string,
            to: string
        },
    }
}

interface CityData {
    _id: string;
    name: string;
}

function* handleGetIdCity(action: HandleGetIdCity): Generator<unknown, void, unknown> {

    try {
        const retryCount = 3;
        const retryDelay = 1000;

        const dataFrom = yield retry(retryCount, retryDelay, apiRequests, {
            type: 'getIdCity',
            payload: { city: action.meta.arg.from, url: 'https://students.netoservices.ru/fe-diplom/routes/cities' },
        })

        const dataTo = yield retry(retryCount, retryDelay, apiRequests, {
            type: 'getIdCity',
            payload: { city: action.meta.arg.to, url: 'https://students.netoservices.ru/fe-diplom/routes/cities' },
        })

        if (dataFrom && dataTo) {
            const from = dataFrom as CityData[];
            const to = dataTo as CityData[];
            yield put(fetchTrains({ from: from[0]._id, to: to[0]._id }))
        }

    } catch (error) {
        console.error(error)
    }
}

const fetchTrainsAction = fetchTrains as unknown as TakeableChannel<unknown>;

function* watchIdCitySaga() {
    yield takeLatest(fetchTrainsAction, handleGetIdCity);
}

export default function* rootSaga() {
    yield spawn(watchIdCitySaga);
}