import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../loader/Loader";

export function Profile() {
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);
	const { isError, data, isLoading, refetch } = useQuery({ queryKey: ["user", token] });

	const mutation = useMutation({
		mutationFn: (user) =>
			axios.put(
				"https://blog.kata.academy/api/user",
				{ user },
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			),
		onSuccess: () => refetch(),
	});
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			username: data?.user?.username || "",
			email: data?.user?.email || "",
		},
	});

	const onSubmit = (dataForm) => {
		mutation.mutate({
			bio: "",
			username: dataForm.username,
			password: dataForm.password,
			email: dataForm.email,
			image: dataForm.url || null,
		});
	};

	useEffect(() => {
		if (data)
			reset({
				username: data.user.username,
				email: data.user.email,
			});
	}, [data]);

	if (isLoading) return <Loader />;

	if (isError) {
		navigate("/sign-in", { replace: true });
		return null;
	}

	return (
		<>
			<div className="form-container">
				<form className="form form--signin" onSubmit={handleSubmit(onSubmit)}>
					<h3 className="form__title">Edit Profile</h3>
					<fieldset className="form__fieldset">
						<label className="form__label">
							Username
							<Controller
								name="username"
								control={control}
								rules={{ minLength: 3, maxLength: 20 }}
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
							New Password
							<Controller
								name="password"
								control={control}
								rules={{ minLength: 6, maxLength: 40 }}
								render={({ field }) => (
									<Input
										size="large"
										status={!!errors.password || mutation.isError ? "error" : ""}
										height={40}
										placeholder="New password"
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
							Avatar image (url)
							<Controller
								name="url"
								control={control}
								rules={{ pattern: /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/ }}
								render={({ field }) => (
									<Input
										size="large"
										status={!!errors.url || mutation.isError ? "error" : ""}
										height={40}
										placeholder="Avatar image"
										{...field}
									/>
								)}
							/>
							{!!errors.url && <p className="form__label-error">Invalid url.</p>}
						</label>
						<label className="form__label">
							Bio
							<Controller
								name="bio"
								control={control}
								render={({ field }) => (
									<Input
										size="large"
										status={!!errors.bio || mutation.isError ? "error" : ""}
										height={40}
										placeholder="Bio"
										{...field}
									/>
								)}
							/>
						</label>
					</fieldset>
					<Button htmlType="submit" size="large" style={{ width: "100%" }} type="primary">
						Save
					</Button>
				</form>
			</div>
			{mutation.isSuccess ? (
				<Alert message="Profile successfully changed" type="success" closable className="error" />
			) : mutation.isError ? (
				<Alert message="Error when changing profile" type="error" closable className="error" />
			) : null}
		</>
	);
}
