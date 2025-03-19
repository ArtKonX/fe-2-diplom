import createRequest from "./createRequest";

const apiRequests = (action: ApiRequests) => {
    const { payload, type } = action;

    if (payload) {
        switch (type) {
            case 'getIdCity':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}?name=${payload.city}`
                });
            case 'fetchTrains':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}?from_city_id=${payload.from}&to_city_id=${payload.to}&date_start=${payload.date && payload.date[0].from}&date_end=${payload.date && payload.date[1].to}`
                });
            case 'fetchTrainsWithOptions':
                return createRequest({
                    method: "GET",
                    url: payload.url
                });
            case 'fetchTypesOfTrainCarriage':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}/${payload.id}/seats`
                });
            default:
                throw new Error(`Нераспознанный тип действия: ${type}`);
        }
    }
};

export default apiRequests;