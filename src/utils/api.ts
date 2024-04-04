export const BASE_URL: string = 'http://127.0.0.1:8000/api';

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const getProductInfo = () => {
    return fetch(`${BASE_URL}/product/info/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(checkResponse)
        .catch((error) => console.error('Ошибка при получении информации:', error));
};

export const setProductInfo = ({pk}) => {
    return fetch(`${BASE_URL}/product/info/${pk}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then(checkResponse)
        .catch((error) => console.error('Ошибка при получении информации:', error));
};