import { useQuery } from "@tanstack/react-query";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

export function HeaderAuthorized() {
	const { token, setToken } = useContext(AuthContext);
	const { data } = useQuery({ queryKey: ["user", token], refetchOnWindowFocus: false });

	const handleLogOut = () => {
		setToken("");
		localStorage.setItem("token", "");
	};

	return (
		<div className="header__profile">
			<Link to="/new-article" style={{ height: "30px" }} className="create">
				Create article
			</Link>
			<Link to="/profile" className="header__profile-info">
				<p>{data?.user.username}</p>
				<Avatar
					src={data?.user?.image && <img src={data.user.image} alt="avatar" />}
					size={46}
					icon={<UserOutlined />}
				/>
			</Link>
			<Button onClick={handleLogOut} className="logout">
				Log Out
			</Button>
		</div>
	);
}
