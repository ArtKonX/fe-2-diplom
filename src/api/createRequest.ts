import axios from 'axios';

const createRequest = async (options: ApiCreateRequest) => {
  try {
    const response = await axios({
      method: options.method,
      url: options.url,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Произошла неизвестная ошибка(");
    }
  }
};

export default createRequest;
