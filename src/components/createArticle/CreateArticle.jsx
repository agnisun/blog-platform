import { useMutation } from "@tanstack/react-query";
import { Alert, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

export function CreateArticle() {
	const [newTag, setNewTag] = useState("");
	const [tags, setTags] = useState([]);
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (article) =>
			axios
				.post(
					"https://blog.kata.academy/api/articles",
					{ article },
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				)
				.then(() => navigate("/")),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutation.mutate({
			title: data.title,
			description: data.description,
			body: data.text,
			tagList: tags.map((tag) => tag.value),
		});
	};

	const handleOnChangeNewTag = (event) => {
		setNewTag(event.target.value);
	};

	const handleCreateTag = () => {
		if (!newTag.trim().length) return;

		setTags((tagsVal) => tagsVal.concat({ value: newTag, id: nanoid() }));
		setNewTag("");
	};

	useEffect(() => {
		if (!token) {
			navigate("/", { replace: true });
		}
	}, [token]);

	return (
		<>
			<div className="form-container form-container--article">
				<form className="form form--article" onSubmit={handleSubmit(onSubmit)}>
					<h3 className="form__title">Create new article</h3>
					<fieldset className="form__fieldset">
						<label className="form__label">
							Title
							<Controller
								name="title"
								control={control}
								rules={{ required: true, minLength: 1 }}
								render={({ field }) => (
									<Input size="large" status={errors.title ? "error" : ""} height={40} placeholder="Title" {...field} />
								)}
							/>
						</label>
						<label className="form__label">
							Short description
							<Controller
								name="description"
								control={control}
								rules={{ required: true, minLength: 1 }}
								render={({ field }) => (
									<Input
										size="large"
										status={errors.description ? "error" : ""}
										height={40}
										placeholder="Title"
										{...field}
									/>
								)}
							/>
						</label>
						<label className="form__label">
							Text
							<Controller
								name="text"
								control={control}
								rules={{ required: true, minLength: 1 }}
								render={({ field }) => (
									<TextArea
										status={errors.text ? "error" : ""}
										style={{ height: "170px", resize: "none" }}
										placeholder="Text"
										{...field}
									/>
								)}
							/>
							{!!errors.password && (
								<p className="form__label-error">Your password needs to be at least 6 characters.</p>
							)}
						</label>
					</fieldset>
					<div className="form__tags">
						<div className="form__label">
							Tags
							<div className="form__tags-input">
								<Input value={newTag} onChange={handleOnChangeNewTag} size="large" height={40} placeholder="Title" />
								<Button
									disabled={!newTag.trim().length}
									onClick={handleCreateTag}
									height={40}
									type="link"
									className="create-tag"
								>
									Add tag
								</Button>
							</div>
						</div>
						<div className="form__tags-list">
							{tags.map((tag) => {
								const handleOnChange = (event) =>
									setTags((tagsVal) =>
										tagsVal.map((element) => {
											if (element.id === tag.id) {
												element.value = event.target.value;
											}

											return element;
										})
									);
								const handleDeleteTag = () => setTags((tagsVal) => tagsVal.filter((element) => element.id !== tag.id));

								return (
									<div key={tag.id} className="form__tags-input">
										<Input value={tag.value} onChange={handleOnChange} size="large" height={40} placeholder="Title" />
										<Button onClick={handleDeleteTag} height={40} type="link" className="create-tag create-tag--delete">
											Delete tag
										</Button>
									</div>
								);
							})}
						</div>
						<Button htmlType="submit" size="large" style={{ width: "100%", maxWidth: "320px" }} type="primary">
							Send
						</Button>
					</div>
				</form>
			</div>
			{mutation.isError && <Alert message="Error while creating article" type="error" closable className="error" />}
			{mutation.isSuccess && <Alert message="Article created successfully" type="success" closable className="error" />}
		</>
	);
}
