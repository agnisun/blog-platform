import { ArticleItemHeader } from "../articleItemHeader/ArticleItemHeader";

export function ArticleItem({ article }) {
	return (
		<li>
			<article className="articles__list-item">
				<ArticleItemHeader article={article} />
				<p className="article__text">{article.description}</p>
			</article>
		</li>
	);
}
