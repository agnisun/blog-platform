import { Button } from "antd";
import { Link } from "react-router-dom";

export function HeaderUnAuthorized() {
	return (
		<div className="header__profile">
			<Link to="/sign-in">
				<Button className="signin" type="text">
					Sign In
				</Button>
			</Link>
			<Link to="/sign-up">
				<Button className="logout logout--green">Sign Up</Button>
			</Link>
		</div>
	);
}
