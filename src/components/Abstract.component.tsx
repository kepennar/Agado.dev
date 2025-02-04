import { useIntl } from "react-intl";
import type { HomePageDataQuery } from "../../graphql-types";
import { RichText } from "./ContentfulRichText/RichText.component";
import { Socials } from "./Socials.component";
import { Spacer } from "./Spacer";

export function Abstract({
	abstract,
	socials,
}: {
	abstract: HomePageDataQuery["abstract"];
	socials: HomePageDataQuery["socials"];
}) {
	const intl = useIntl();

	if (!abstract?.content?.raw) {
		return null;
	}
	return (
		<div>
			<h2>{intl.formatMessage({ id: "about" })}</h2>
			<Socials socials={socials} />
			<Spacer direction="vertical" size="1rem" />
			<RichText rawRichText={abstract.content.raw} />
		</div>
	);
}
