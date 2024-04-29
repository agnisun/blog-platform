import axios from "axios";

export const fetchArticles = async (offset) => {
	try {
		const { data } = await axios.get(`https://blog.kata.academy/api/articles?offset=${offset}`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		});
		return data;
	} catch (error) {
		throw new Error(error?.response?.data?.errors.message || "Ошибка при получении списка статей");
	}
};
