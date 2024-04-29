import axios from "axios";

export const fetchLikes = async (slug, isFavourited) => {
	try {
		if (isFavourited) {
			const { data } = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`, undefined, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			return data;
		}
		const { data } = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		});
		return data;
	} catch (error) {
		throw new Error(error?.response?.data?.errors.message || "Ошибка при попытке добавить в понравившиеся");
	}
};
