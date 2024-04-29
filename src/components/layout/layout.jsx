import { Outlet } from "react-router-dom";

import { Header } from "../header/Header";
import "./index.css";

export function Layout() {
	return (
		<div className="layout">
			<Header />
			<section>
				<Outlet />
			</section>
		</div>
	);
}
