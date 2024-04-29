import axios from "axios";

export const fetchArticle = async (slug) => {
	try {
		const { data } = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		});
		return data;
	} catch (error) {
		throw new Error(error?.response?.data?.errors.message || "Ошибка при получении статьи");
	}
};
