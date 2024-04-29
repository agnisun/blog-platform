import { Spin } from "antd";
import "./index.css";

export function Loader() {
	return (
		<div className="loader">
			<Spin />
		</div>
	);
}
