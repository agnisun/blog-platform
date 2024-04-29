import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";

import { Articles } from "./components/articles/Articles";
import { Article } from "./components/article/Article";
import { Layout } from "./components/layout/layout";
import { SignIn } from "./components/sign-in/SignIn";
import { SignUp } from "./components/sign-up/SignUp";
import { Profile } from "./components/profile/Profile";
import { CreateArticle } from "./components/createArticle/CreateArticle";
import { ArticleEdit } from "./components/articleEdit/ArticleEdit";

export function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			errorElement: <Navigate to="/" replace />,
			children: [
				{
					index: true,
					element: <Articles />,
				},
				{
					path: "/articles",
					children: [
						{
							index: true,
							element: <Articles />,
						},
						{
							path: "/articles/:slug",
							element: <Article />,
						},
						{
							path: "/articles/:slug/edit",
							element: <ArticleEdit />,
						},
					],
				},
				{
					path: "/sign-in",
					element: <SignIn />,
				},
				{
					path: "/sign-up",
					element: <SignUp />,
				},
				{
					path: "/profile",
					element: <Profile />,
				},
				{
					path: "/new-article",
					element: <CreateArticle />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
