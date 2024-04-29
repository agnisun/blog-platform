import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Alert, Popconfirm, Button } from "antd";
import axios from "axios";
import { useContext, useEffect } from "react";

import { fetchArticle } from "../../fetch/fetchArticle";
import { ArticleItemHeader } from "../articleItemHeader/ArticleItemHeader";
import "./index.css";
import { Loader } from "../loader/Loader";
import { AuthContext } from "../../context/AuthContext";

export function Article() {
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);
	const userQuery = useQuery({ queryKey: ["user", token] });
	const { slug } = useParams();
	const { isLoading, data } = useQuery({
		queryKey: ["article", { slug }],
		queryFn: () => fetchArticle(slug),
		retry: false,
		refetchOnWindowFocus: false,
	});
	const mutation = useMutation({
		mutationFn: (article) =>
			axios.delete(`https://blog.kata.academy/api/articles/${article.slug}`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			}),
	});

	const handleDelete = () => {
		mutation.mutate(data.article);
	};

	useEffect(() => {
		if (mutation.isSuccess) navigate("/", { replace: true });
	}, [mutation.isSuccess]);

	if (isLoading) return <Loader />;

	return (
		<>
			<div className="page--article container">
				<article className="article">
					<ArticleItemHeader article={data.article} disableLink />
					<div className="article__edit">
						<p className="article__description">{data?.article.description}</p>
						{!userQuery.isPending &&
							!userQuery.isError &&
							data?.article.author.username === userQuery.data.user.username && (
								<div className="article__edit-buttons">
									<Popconfirm
										placement="right"
										title="Are you sure to delete this article?"
										okText="Yes"
										cancelText="No"
										onConfirm={handleDelete}
									>
										<Button style={{ height: "30px" }} type="link" className="create-tag create-tag--delete">
											Delete tag
										</Button>
									</Popconfirm>
									<Link
										className="create"
										to={`/articles/${data?.article.slug}/edit`}
										style={{ height: "30px" }}
										type="link"
									>
										Edit
									</Link>
								</div>
							)}
					</div>
					<Markdown remarkPlugins={[remarkGfm]}>{data?.article.body}</Markdown>
				</article>
			</div>
			{mutation.isError && <Alert message="Error while deleting article" type="error" closable className="error" />}
		</>
	);
}
