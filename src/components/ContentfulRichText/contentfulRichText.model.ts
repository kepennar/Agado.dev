import { z } from "zod";

// Enum for node types
const NodeType = z.enum([
	"document",
	"paragraph",
	"text",
	"heading-1",
	"heading-2",
	"heading-3",
	"heading-4",
	"unordered-list",
	"ordered-list",
	"list-item",
	"embedded-asset-block",
	"table",
	"table-row",
	"table-cell",
	"table-header-cell",
	"hyperlink",
	"hr",
]);
export type ContentfulNodeType = z.infer<typeof NodeType>;

const TextMarkType = z.enum(["bold", "italic", "underline", "code"]);

const TextNode = z.object({
	nodeType: z.literal("text"),
	value: z.string(),
	marks: z.array(z.object({ type: TextMarkType })),
	data: z.record(z.any()),
});
type TextNodeType = z.infer<typeof TextNode>;

const HyperlinkNode = z.object({
	nodeType: z.literal("hyperlink"),
	data: z.object({
		uri: z.string(),
	}),
	content: z.array(z.lazy(() => TextNode)), // Hyperlinks contain TextNodes as children
});
export type HyperlinkNodeType = z.infer<typeof HyperlinkNode>;

const EmbeddedAssetBlockNode = z.object({
	nodeType: z.literal("embedded-asset-block"),
	data: z.object({
		target: z.object({
			sys: z.object({
				id: z.string(),
				type: z.string(),
				linkType: z.string(),
			}),
		}),
	}),
	content: z.array(z.any()),
});
type EmbeddedAssetBlockNodeType = z.infer<typeof EmbeddedAssetBlockNode>;

const ParagraphNode = z.object({
	nodeType: z.literal("paragraph"),
	data: z.record(z.any()),
	content: z.array(z.union([TextNode, HyperlinkNode, EmbeddedAssetBlockNode])),
});
type ParagraphNodeType = z.infer<typeof ParagraphNode>;

const HeadingNode = z.object({
	nodeType: z.enum([
		"heading-1",
		"heading-2",
		"heading-3",
		"heading-4",
		"heading-5",
		"heading-6",
	]),
	data: z.record(z.any()),
	content: z.array(z.union([TextNode, HyperlinkNode])),
});
export type HeadingNodeType = z.infer<typeof HeadingNode>;

const RichTextNode: z.ZodType<any> = z.lazy(() =>
	z.union([
		ParagraphNode,
		HeadingNode,
		TextNode,
		HyperlinkNode,
		EmbeddedAssetBlockNode,
		GenericNode,
	]),
);
export type RichTextNodeType =
	| ParagraphNodeType
	| HeadingNodeType
	| TextNodeType
	| HyperlinkNodeType
	| EmbeddedAssetBlockNodeType;

const GenericNode: z.ZodType<any> = z.lazy(() =>
	z.object({
		nodeType: NodeType,
		data: z.record(z.any()),
		content: z.array(RichTextNode),
	}),
);

export const RichTextDocument = z.object({
	nodeType: z.literal("document"),
	data: z.record(z.any()),
	content: z.array(RichTextNode),
});
