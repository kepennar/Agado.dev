import styled from "@emotion/styled";
import type { HomePageDataQuery } from "../../graphql-types";
import { Spacer } from "./Spacer";

const SocialLayout = styled.div`
  display: flex;
`;
const SocialsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #ffffff4a;
`;

const SocialLink = styled.a`
  margin: 0 1rem;

  @media (max-width: 500px) {
    margin: 0 0.5rem;
  }
  height: 25px;
  @media (max-width: 500px) {
    height: 20px;
  }
`;
const SocialImage = styled.img`
  height: 100%;
`;

export function Socials({
	socials,
}: {
	socials: HomePageDataQuery["socials"];
}) {
	const socialLinks = socials.edges.map(({ node }) => {
		return {
			label: node.label ?? undefined,
			url: node.url ?? undefined,
			pictoUrl: node.picto?.url ?? undefined,
		};
	});

	return (
		<SocialLayout>
			<SocialsContainer>
				{socialLinks.map((node, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<SocialLink key={index} href={node.url}>
						<SocialImage
							src={node.pictoUrl}
							alt={`${node.label} logo`}
							title={`${node.label} logo`}
						/>

						<Spacer direction="vertical" size="0.5rem" />
					</SocialLink>
				))}
			</SocialsContainer>
		</SocialLayout>
	);
}
