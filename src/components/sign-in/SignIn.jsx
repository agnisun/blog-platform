import { Button, Input, Alert } from "antd";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "./index.css";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

export function SignIn() {
	const { setToken } = useContext(AuthContext);
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (user) =>
			axios.post("https://blog.kata.academy/api/users/login", { user }).then(({ data }) => {
				setToken(data.user.token);
				localStorage.setItem("token", data.user.token);
				navigate("/articles");
			}),
	});

	const [searchParams] = useSearchParams();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: searchParams.get("email") || "",
		},
	});

	const onSubmit = (data) => {
		mutation.mutate({ password: data.password, email: data.email });
	};

	return (
		<>
			<div className="form-container">
				<form className="form form--signin" onSubmit={handleSubmit(onSubmit)}>
					<h3 className="form__title">Sign In</h3>
					<fieldset className="form__fieldset">
						<label className="form__label">
							Email address
							<Controller
								name="email"
								control={control}
								rules={{
									required: true,
									pattern:
										/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								}}
								render={({ field }) => (
									<Input
										size="large"
										status={!!errors.email || mutation.isError ? "error" : ""}
										height={40}
										placeholder="Email address"
										type="email"
										{...field}
									/>
								)}
							/>
						</label>
						<label className="form__label">
							Password
							<Controller
								name="password"
								control={control}
								rules={{ required: true, minLength: 6, maxLength: 40 }}
								render={({ field }) => (
									<Input
										size="large"
										status={!!errors.password || mutation.isError ? "error" : ""}
										height={40}
										placeholder="Password"
										type="password"
										{...field}
									/>
								)}
							/>
						</label>
					</fieldset>
					<Button htmlType="submit" size="large" style={{ width: "100%" }} type="primary">
						Login
					</Button>
					<p>
						Don’t have an account?{" "}
						<Link className="form__link" to="/sign-up">
							Sign Up
						</Link>
						.
					</p>
				</form>
			</div>
			{mutation.isError && <Alert message="Email or password are invalid" type="error" closable className="error" />}
		</>
	);
}
