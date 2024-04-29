import { UserOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Avatar } from "antd";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { nanoid } from "nanoid";

import { fetchLikes } from "../../fetch/fetchLikes";
import { AuthContext } from "../../context/AuthContext";

export function ArticleItemHeader({ article, disableLink }) {
	const { token } = useContext(AuthContext);
	const { isError, isPending } = useQuery({ queryKey: ["user", token] });
	const [isFavorited, setIsFavorited] = useState(article.favorited);
	const likeMutation = useMutation({
		mutationFn: (isFavoritedArg) => fetchLikes(article.slug, isFavoritedArg),
	});

	const handleLike = () => {
		if (isError) return;

		setIsFavorited((favorited) => !favorited);
		likeMutation.mutate(!isFavorited);
	};

	return (
		<header className="article__header">
			<div className="article__header-info">
				<div className="article__header-info__group">
					{disableLink ? (
						<h3 className="article__header-title">{article.title}</h3>
					) : (
						<Link className="article__link" to={`/articles/${article.slug}`}>
							<h3 className="article__header-title">{article.title}</h3>
						</Link>
					)}
					{!isPending && !isError && (
						<button type="button" className="article__header-likes" onClick={handleLike}>
							{isFavorited ? <HeartFilled style={{ color: "#FF0707" }} /> : <HeartOutlined />}
							<span>{article.favoritesCount - Boolean(article.favorited) + Boolean(isFavorited)}</span>
						</button>
					)}
				</div>
				<ul className="article__header-tags">
					{article.tagList.map((tag) =>
						tag ? (
							<li key={nanoid()}>
								<button type="button" className="article__header-tags__tag">
									{tag}
								</button>
							</li>
						) : null
					)}
				</ul>
			</div>
			<div className="article__header-profile">
				<div className="article__header-profile__user">
					<p className="article__header-profile__name">{article.author.username}</p>
					<div className="article__header-profile__date">{format(article.createdAt, "PP")}</div>
				</div>
				<Avatar src={<img src={article.author.image} alt="avatar" />} size={46} icon={<UserOutlined />} />
			</div>
		</header>
	);
}
