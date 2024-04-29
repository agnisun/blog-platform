import axios from "axios";

export const fetchUser = async () => {
	try {
		const { data } = await axios.get("https://blog.kata.academy/api/user", {
			headers: {
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		});
		return data;
	} catch (error) {
		throw new Error(error?.response?.data?.errors.message || "Ошибка при получении данных пользователя");
	}
};
