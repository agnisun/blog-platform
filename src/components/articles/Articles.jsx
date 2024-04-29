import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";

import { fetchArticles } from "../../fetch/fetchArticles";
import { ArticleItem } from "../articleItem/ArticleItem";
import { Loader } from "../loader/Loader";
import "./index.css";

const DEFAULT_ARTICLES_SIZE = 20;

export function Articles() {
	const [offset, setOffset] = useState(0);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["articles", offset],
		retry: false,
		refetchOnWindowFocus: false,
		queryFn: () => fetchArticles(offset),
	});

	const handleOnChange = (page) => {
		setOffset(Math.max(0, (page - 1) * DEFAULT_ARTICLES_SIZE));
	};

	if (isLoading) return <Loader />;

	if (isError)
		return (
			<p style={{ display: "flex", justifyContent: "center", padding: "20px 15px", margin: 0 }}>{error?.message}</p>
		);

	return (
		<section className="articles">
			<ul className="articles__list container">
				{data.articles.map((article) => (
					<ArticleItem key={article.slug} article={article} />
				))}
			</ul>
			<Pagination
				onChange={handleOnChange}
				current={offset / 20 + 1}
				pageSize={20}
				total={data.articlesCount}
				showQuickJumper={false}
				showSizeChanger={false}
			/>
		</section>
	);
}
