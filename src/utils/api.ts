export const BASE_URL: string = 'https://127.0.0.1:8000/api';

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const getProductInfo = () => {
    return fetch(`${BASE_URL}/order/info`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(checkResponse)
};