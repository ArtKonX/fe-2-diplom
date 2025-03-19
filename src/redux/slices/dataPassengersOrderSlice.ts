import {
    buildCreateSlice,
    asyncThunkCreator
} from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
    dataPassengersArray: Order[] | undefined,
    success: { status: boolean },
    loading: boolean,
    url: string,
    error: string,
}

interface Order {
    user: UserData;
    departure: DirectionData;
    arrival?: DirectionData
}

interface UserData {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    payment_method: 'cash' | 'online';
}

interface DirectionData {
    route_direction_id?: number;
    seats?: Seat[];
}

interface Seat {
    coach_id: number;
    person_info: PersonInfo;
    seat_number: number;
    is_child: boolean;
    include_children_seat: boolean;
}

interface PersonInfo {
    is_adult: boolean;
    first_name: string;
    last_name: string;
    patronymic: string;
    gender: boolean;
    birthday: string;
    document_type: 'паспорт' | 'свидетельство';
    document_data?: string;
}

interface AddDataPassenger {
    dataPassengers: Order[] | undefined
}

const initialState = {
    dataPassengersArray: [],
    success: { status: false },
    loading: false,
    url: `${import.meta.env.VITE_BACKEND_URL}/order`,
    error: '',
} as OrderState

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const dataPassengersOrderSlice = createSliceWithThunk({
    name: "dataPassengersOrder",
    initialState,
    selectors: {
        dataUser: (state) => state
    },
    reducers: (create) => ({
        addDataPassenger: create.reducer((state, action: { payload: AddDataPassenger }) => {
            state.dataPassengersArray = action.payload.dataPassengers && [...action.payload.dataPassengers];
        }),
        orderPassenger: create.asyncThunk(
            async (_, { getState, rejectWithValue }) => {

                const state = getState() as { dataPassengersOrder: OrderState };

                const url = state.dataPassengersOrder.url;

                if (state.dataPassengersOrder.dataPassengersArray) {
                    const responses = await Promise.all(state.dataPassengersOrder.dataPassengersArray.map(async (passenger) => {
                        try {
                            const response = await axios.post(url, passenger);

                            if (response.data.Error) {
                                throw new Error("Ошибка оформления заказа!");
                            }

                            return response.data;
                        } catch (error) {
                            return rejectWithValue(error || "Ошибка при обработке заказа");
                        }
                    }));

                    return responses;
                }
                return rejectWithValue("Нет данных для обработки");
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state, action) => {
                    if (action.payload !== undefined) {
                        state.success = action.payload as unknown as { status: boolean };
                    }

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
        resetDataPassengersOrder: create.reducer((state) => {
            state.dataPassengersArray = [];
            state.success = { status: false };
            state.loading = false;
            state.error = '';
        }),
    })
})

export const { resetDataPassengersOrder, addDataPassenger, orderPassenger } = dataPassengersOrderSlice.actions;
export default dataPassengersOrderSlice.reducer;