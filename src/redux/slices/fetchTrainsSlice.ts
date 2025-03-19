import {
    buildCreateSlice,
    asyncThunkCreator
} from "@reduxjs/toolkit";

import dayjs from 'dayjs';
import apiRequests from "../../api/apiRequests";

interface Date {
    from?: string | dayjs.Dayjs,
    to?: string | dayjs.Dayjs
}

interface Directions {
    from?: string | dayjs.Dayjs,
    to?: string | dayjs.Dayjs
}

interface FetchTrainsState {
    date: Date[],
    limit: number,
    render: boolean,
    status: {[key in string]: boolean},
    renderDate: boolean,
    directions: Directions[],
    options: Option[],
    trains: { total_count: number, items: TrainCardProps[] },
    allTrains: { total_count: number, items: TrainCardProps[] },
    loading: boolean,
    url: string,
    error: string,
}

interface Option {
    option: string,
    status: string | boolean | number
}

interface FetchTrainsAction {
    payload: {
        from?: string,
        to?: string,
        option: {
            nameForUrl: string,
            status: string | boolean | number
        }
    }
}

interface AddDateAction {
    payload: {
        from?: string | dayjs.Dayjs,
        to?: string | dayjs.Dayjs,
        date?: string,
        directionName?: string
    }
}

interface SortTrainsAction {
    payload: {
        nameSort: string
    }
}

interface AddLimitAction {
    payload: {
        limit: number
    }
}

interface AddOffSetAction {
    payload: {
        offset: number
    }
}

interface ChangeStatus {
    payload: {
        statusName: string,
        status: boolean
    }
}

interface ChangeRender {
    payload: {
        render: boolean
    }
}

const initialState = {
    date: [],
    directions: [],
    trains: { total_count: 0, items: [] },
    allTrains: { total_count: 0, items: [] },
    options: [],
    limit: 5,
    render: false,
    renderDate: false,
    loading: false,
    status: {},
    url: '',
    error: '',
} as unknown as FetchTrainsState

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const fetchTrainsSlice = createSliceWithThunk({
    name: "fetchTrains",
    initialState,
    selectors: {
        dataUser: (state) => state
    },
    reducers: (create) => ({
        changeRender: create.reducer((state, action: ChangeRender) => {
            state.render = action.payload.render;
        }),
        changeStatus: create.reducer((state, action: ChangeStatus) => {
            state.status = { [action.payload.statusName]: action.payload.status };
        }),
        addDate: create.reducer((state, action: { payload: { from: string | dayjs.Dayjs, to: string | dayjs.Dayjs } }) => {
            state.date = [{ from: action.payload.from }, { to: action.payload.to }];
        }),
        addDateDirection: create.reducer((state, action: AddDateAction) => {

            state.renderDate = !state.renderDate

            const index = action.payload.directionName == 'from' ? 0 : 1;

            if (!state.date.length) {
                state.date = [{ from: '' }, { to: '' }];
            } else {
                const dateDirection = state.date[index] as { [key in string]: string | undefined };

                if (action.payload.directionName) dateDirection[action.payload.directionName] = action.payload.date;
            }

        }),
        addDirections: create.reducer((state, action: AddDateAction) => {
            state.directions = [{ from: action.payload.from }, { to: action.payload.to }];
        }),
        addOption: create.reducer((state, action: FetchTrainsAction) => {
            const findOptionIndex = state.options.findIndex(option => option.option == action.payload.option.nameForUrl);

            if (findOptionIndex !== -1) {
                state.options[findOptionIndex] = { option: action.payload.option.nameForUrl, status: action.payload.option.status };
            } else {
                state.options.push({ option: action.payload.option.nameForUrl, status: action.payload.option.status });
            }
        }),
        addLimit: create.reducer((state, action: AddLimitAction) => {
            state.limit = action.payload.limit;

            const findOptionIndex = state.options.findIndex(option => option.option == 'limit');

            if (findOptionIndex !== -1) {
                state.options[findOptionIndex] = { option: 'limit', status: action.payload.limit };
            } else {
                state.options.push({ option: 'limit', status: action.payload.limit });
            }
        }),
        addOffSet: create.reducer((state, action: AddOffSetAction) => {
            const findOptionIndex = state.options.findIndex(option => option.option == 'offset');
            const findLimit = state.options.find(option => option.option == 'limit ');

            const limit = findLimit ? Number(findLimit.status) : 5;

            if (findOptionIndex !== -1) {

                state.options[findOptionIndex] = { option: 'offset', status: (action.payload.offset * limit - limit) };
            } else {
                state.options.push({ option: 'offset', status: (action.payload.offset * limit - limit) });
            }
        }),
        sortTrains: create.reducer((state, action: SortTrainsAction) => {
            const findOptionIndex = state.options.findIndex(option => option.option == 'sort');

            if (findOptionIndex !== -1) {
                state.options[findOptionIndex] = { option: 'sort', status: action.payload.nameSort };
            } else {
                state.options.push({ option: 'sort', status: action.payload.nameSort });
            }
        }),
        fetchTrainsByOption: create.asyncThunk(
            async (_, { getState, rejectWithValue }) => {

                try {
                    const state = getState() as { fetchTrains: FetchTrainsState };

                    const stateUrl = state.fetchTrains.url;

                    const urlCurrent = state.fetchTrains.options.reduce((acc, element) => {
                        return acc + '&' + element.option + '=' + element.status;
                    }, stateUrl);

                    const response = await apiRequests({
                        type: 'fetchTrainsWithOptions',
                        payload: {
                            url: urlCurrent && urlCurrent
                        }
                    });

                    return response;

                } catch (e) {
                    return rejectWithValue(e);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state, action) => {

                    state.trains = action.payload as unknown as { total_count: number; items: TrainCardProps[]; };
                    state.error = "";
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                },
                settled: (state) => {
                    state.loading = false;
                },
            }
        ),
        fetchTrains: create.asyncThunk(
            async (action: {
                from: string | undefined,
                to: string | undefined,
            }, { getState, rejectWithValue }) => {
                try {
                    const state = getState() as { fetchTrains: FetchTrainsState };

                    const url = `${import.meta.env.VITE_BACKEND_URL}/routes?from_city_id=${action.from}&to_city_id=${action.to}&date_start=${state.fetchTrains.date[0].from}&date_end=${state.fetchTrains.date[1].to}`;

                    const response = await apiRequests({
                        type: 'fetchTrains',
                        payload: {
                            url: `${import.meta.env.VITE_BACKEND_URL}/routes`,
                            from: action.from,
                            to: action.to,
                            date: [
                                { from: state.fetchTrains.date[0].from },
                                { to: state.fetchTrains.date[1].to }
                            ]
                        }
                    });
                    return [response, url];

                } catch (e) {
                    return rejectWithValue(e);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state, action) => {

                    state.trains = action.payload[0] as unknown as { total_count: number; items: TrainCardProps[]; };
                    state.allTrains = action.payload[0] as unknown as { total_count: number; items: TrainCardProps[]; };
                    state.url = action.payload[1] as unknown as string;
                    state.render = !state.render;
                    state.error = "";

                    state.loading = false;
                },
                rejected: (state, action) => {

                    state.error = action.payload as string;
                    state.loading = false;
                },
                settled: (state) => {

                    state.loading = false;
                },
            }
        ),
        resetFetchTrains: create.reducer((state) => {
            state.date = [];
            state.directions = [];
            state.trains = { total_count: 0, items: [] };
            state.allTrains = { total_count: 0, items: [] };
            state.options = [];
            state.limit = 5;
            state.render = false;
            state.renderDate = false;
            state.loading = false;
            state.status = {};
            state.url = '';
            state.error = '';
        }),
    }),
});

export const { resetFetchTrains, changeRender, changeStatus, addDate, fetchTrains, addDirections, addDateDirection, addOption, sortTrains, addLimit, addOffSet, fetchTrainsByOption } = fetchTrainsSlice.actions;
export default fetchTrainsSlice.reducer;