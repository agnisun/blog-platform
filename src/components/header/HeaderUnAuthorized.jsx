import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function HeaderUnAuthorized() {
	const navigate = useNavigate();

	const handleSignIn = () => {
		navigate("/sign-in");
	};

	return (
		<div className="header__profile">
			<Button onClick={handleSignIn} className="signin" type="text">
				Sign In
			</Button>
			<Button className="logout logout--green">Sign Up</Button>
		</div>
	);
}
