import { Head as HeadComponent } from "../components/Head"
import Layout from "../components/Layout"
import { AvailableLanguageType } from "../i18n/i18n.model"

export default function NotFoundPage({
  pageContext: { language },
}: {
  pageContext: { language: AvailableLanguageType }
}) {
  return (
    <Layout language={language}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}
export const Head = () => <HeadComponent title="404: Not found" />
