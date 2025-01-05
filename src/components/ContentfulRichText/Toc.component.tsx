import { useIntl } from "react-intl"
import {
  ContentfulNodeType,
  HeadingNodeType,
  HyperlinkNodeType,
  RichTextDocument,
  RichTextNodeType,
} from "./contentfulRichText.model"
import { getHeadingId } from "./contentfulRichText.utilities"

export function Toc({ contentFulRaw }: { contentFulRaw: string }) {
  const intl = useIntl()

  const rawRichText = RichTextDocument.parse(JSON.parse(contentFulRaw))

  const heading2 = getNodesOfType({
    content: rawRichText.content,
    nodeType: "heading-2",
  })
  const links = heading2.map((node) => {
    if (node.nodeType !== "heading-2") {
      return null
    }
    const text = getTextContent(node)
    const id = getHeadingId(text)
    if (!id) {
      return null
    }

    return (
      <li>
        <a key={id} href={`#${id}`}>
          {text}
        </a>
      </li>
    )
  })
  if (links.length === 0) {
    return null
  }

  return (
    <nav id="toc">
      <h2>{intl.formatMessage({ id: "toc" })}</h2>
      <ul>{links}</ul>
    </nav>
  )
}

function getTextContent(
  node: HeadingNodeType | HyperlinkNodeType
): string | null {
  if (!node.content) {
    return null
  }

  return node.content
    .map((childNode) => {
      if (childNode.nodeType === "text") {
        return childNode.value
      }
      return getTextContent(childNode)
    })
    .join("")
}
/**
 * Recursivlely traverse node contents to find the all nodes of the given type
 */
function getNodesOfType({
  content,
  nodeType,
}: {
  nodeType: ContentfulNodeType
  content: RichTextNodeType[]
}): RichTextNodeType[] {
  const nodes: RichTextNodeType[] = []

  for (const node of content) {
    if (node.nodeType === nodeType) {
      nodes.push(node)
    }

    if (node.nodeType !== "text" && node.content) {
      nodes.push(...getNodesOfType({ nodeType, content: node.content }))
    }
  }

  return nodes
}
