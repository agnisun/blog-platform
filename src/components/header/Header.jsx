import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { fetchUser } from "../../fetch/fetchUser";
import { AuthContext } from "../../context/AuthContext";

import { HeaderUnAuthorized } from "./HeaderUnAuthorized";
import { HeaderAuthorized } from "./HeaderAuthorized";
import "./index.css";

export function Header() {
	const { token } = useContext(AuthContext);
	const { isError, isLoading } = useQuery({
		queryKey: ["user", token],
		queryFn: fetchUser,
		retry: false,
		refetchOnWindowFocus: false,
	});

	return (
		<header className="header">
			<hgroup>
				<Link to="/">
					<h1 className="header__title">Realworld Blog</h1>
				</Link>
			</hgroup>
			{!isLoading && (isError ? <HeaderUnAuthorized /> : <HeaderAuthorized />)}
		</header>
	);
}
