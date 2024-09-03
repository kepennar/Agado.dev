import { StaticImage } from "gatsby-plugin-image"

export const PandaImage = () => {
  return (
    <StaticImage
      src="../../images/panda.png"
      placeholder="blurred"
      style={{ borderRadius: "50px" }}
      alt="Panda avatar"
    />
  )
}
