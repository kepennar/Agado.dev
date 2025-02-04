import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image";
import React from "react";

import type { CodeImageQuery } from "../../../graphql-types";

export const CodeImage = () => {
	const { mobileImage, desktopImage } =
		useStaticQuery<CodeImageQuery>(codeImageQuery);

	if (!desktopImage || !mobileImage) {
		throw new Error("Image is not available");
	}
	const images = withArtDirection(getImage(desktopImage), [
		{ media: "(max-width: 768px)", image: getImage(mobileImage) },
	]);
	return (
		<React.Fragment>
			<GatsbyImage
				image={images}
				style={{ height: "100%" }}
				alt="Line of codes on dark background"
			/>
		</React.Fragment>
	);
};

export const codeImageQuery = graphql`
  query CodeImage {
    mobileImage: file(relativePath: { eq: "code.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 768
          transformOptions: {
            duotone: { highlight: "#4267b2", shadow: "#051424", opacity: 60 }
          }
          layout: CONSTRAINED
        )
      }
    }
    desktopImage: file(relativePath: { eq: "code-desktop.png" }) {
      childImageSharp {
        gatsbyImageData(
          transformOptions: {
            duotone: { highlight: "#4267b2", shadow: "#051424", opacity: 60 }
          }
          layout: FULL_WIDTH
        )
      }
    }
  }
`;
