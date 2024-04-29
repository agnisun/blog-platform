import { Alert, Button, Checkbox, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function SignUp() {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (user) =>
			axios.post("https://blog.kata.academy/api/users", { user }).then(() => {
				navigate(`/sign-in?email=${user.email}`);
			}),
	});
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutation.mutate({ username: data.username, password: data.password, email: data.email });
	};
	const password = useRef();
	password.current = watch("password", "");

	return (
		<>
			<div className="form-container">
				<form className="form form--signin" onSubmit={handleSubmit(onSubmit)}>
					<h3 className="form__title">Create new account</h3>
					<fieldset className="form__fieldset">
						<label className="form__label">
							Username
							<Controller
								name="username"
								control={control}
								rules={{ required: true, minLength: 3, maxLength: 20 }}
								render={({ field }) => (
									<Input
										size="large"
										status={errors.username ? "error" : ""}
										height={40}
										placeholder="Username"
										{...field}
									/>
								)}
							/>
						</label>
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
										status={errors.email ? "error" : ""}
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
										status={errors.password ? "error" : ""}
										height={40}
										placeholder="Password"
										type="password"
										{...field}
									/>
								)}
							/>
							{!!errors.password && (
								<p className="form__label-error">Your password needs to be at least 6 characters.</p>
							)}
						</label>
						<label className="form__label">
							Repeat Password
							<Controller
								name="repeatPassword"
								control={control}
								rules={{ required: true, minLength: 6, maxLength: 40, validate: (value) => value === password.current }}
								render={({ field }) => (
									<Input
										size="large"
										status={errors.password ? "error" : ""}
										height={40}
										placeholder="Repeat password"
										type="password"
										{...field}
									/>
								)}
							/>
							{!!errors.repeatPassword && <p className="form__label-error">Passwords do not match</p>}
						</label>
					</fieldset>
					<label className="form__checkbox" style={{ color: errors.info ? "rgb(245, 34, 45)" : "inherit" }}>
						<Controller
							name="info"
							control={control}
							rules={{ required: true }}
							render={({ field }) => <Checkbox checked={field.value} {...field} />}
						/>
						I agree to the processing of my personal information
					</label>
					<Button htmlType="submit" size="large" style={{ width: "100%" }} type="primary">
						Create
					</Button>
					<p>
						Already have an account?{" "}
						<Link className="form__link" to="/sign-in">
							Sign In
						</Link>
						.
					</p>
				</form>
			</div>
			{mutation.isError && <Alert message="Error while registering user" type="error" closable className="error" />}
		</>
	);
}
