import styled from "@emotion/styled";
import { Highlight, Prism, themes } from "prism-react-renderer";
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-diff");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-shell-session");
require("prismjs/components/prism-toml");
require("prismjs/components/prism-nginx");
require("prismjs/components/prism-docker");

const CodeBlockWrapper = styled.div`
  margin-top: -1.2rem;

  .diff-added {
    background-color: rgb(20 83 45 / 0.3);
  }
  .diff-removed {
    background-color: rgb(127 29 29 / 0.3);
  }
`;

export function CodeBlock({
	code,
	language,
}: {
	code: string;
	language: string;
}) {
	const isDiff = language.includes("diff");
	return (
		<CodeBlockWrapper>
			<Highlight
				theme={themes.jettwaveDark}
				code={code}
				language={language}
				prism={Prism}
			>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre className={className} style={style}>
						{tokens.map((line, i) => {
							const lineProps = getLineProps({ line, key: i });

							if (isDiff) {
								const lineContent = line[0]?.content;
								if (lineContent?.startsWith("+")) {
									lineProps.className = "diff-added";
								} else if (lineContent?.startsWith("-")) {
									lineProps.className = "diff-removed";
								}
							}

							return (
								<div {...lineProps}>
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token, key })} />
									))}
								</div>
							);
						})}
					</pre>
				)}
			</Highlight>
		</CodeBlockWrapper>
	);
}

export function detectCodeBlock(content: string) {
	const codeBlockRegex = /^```(?:[\w|-]+)\n([\s\S]*?)\n```$/;
	const matches = content.match(codeBlockRegex);
	if (!matches) {
		return null;
	}

	const language = content.match(/^```([\w|-]+)/)?.[1] ?? "text";
	const code = matches[1] ?? "";

	return { code, language };
}
