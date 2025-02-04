import React from "react";
import { Head as HeadComponent } from "../components/Head";
import Layout from "../components/Layout";
import type { AvailableLanguageType } from "../i18n/i18n.model";

export default function NotFoundPage({
	pageContext: { language },
}: {
	pageContext: { language: AvailableLanguageType };
}) {
	return (
		<Layout language={language} header={() => "😢"}>
			<h1>NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Layout>
	);
}
export const Head = ({
	pageContext: { language },
}: {
	pageContext: {
		language: AvailableLanguageType;
	};
}) => <HeadComponent lang={language} title="404: Not found" />;
