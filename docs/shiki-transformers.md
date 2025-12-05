# Shiki Transformers Guide

This project uses [Shiki](https://shiki.style/) for syntax highlighting with powerful transformers that enable advanced code block features.

## Available Features

### 1. Diff Highlighting

Mark additions and removals in code:

```typescript
function hello() {
  console.log("Hello, World!"); // [!code --]
  console.log("Hello, Agado!"); // [!code ++]
}
```

**Output**: Lines with `++` are highlighted in green, lines with `--` in red, with `+` and `-` indicators.

### 2. Line Highlighting

Emphasize specific lines:

```typescript
function calculate(x, y) {
  const result = x + y; // [!code highlight]
  return result;
}
```

**Output**: Highlighted line has a subtle background color.

### 3. Focus Mode

Blur non-focused lines to direct attention:

```typescript
function process(data) {
  validate(data);
  const result = transform(data); // [!code focus]
  return result;
}
```

**Output**: Non-focused lines are blurred, become clear on hover.

### 4. Error & Warning Levels

Mark problematic code:

```typescript
const user = getUser(); // [!code error]
const config = getConfig(); // [!code warning]
```

**Output**: Error lines have red background and left border, warnings have yellow.

## Multi-line Notation

Use `:N` syntax to apply transformers to multiple consecutive lines:

```typescript
function fibonacci(n) {
  if (n <= 1) return n; // [!code highlight:3]
  const a = fibonacci(n - 1);
  const b = fibonacci(n - 2);
  return a + b;
}
```

## Usage in Contentful

When creating code blocks in Contentful rich text, use standard markdown code fences with the transformer notation:

\`\`\`typescript
function example() {
  const old = "value"; // [!code --]
  const new = "value"; // [!code ++]
}
\`\`\`

## Configuration

Transformers are configured in `astro.config.mjs`:

```javascript
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
} from '@shikijs/transformers';

export default defineConfig({
  markdown: {
    shikiConfig: {
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
      ],
    },
  },
});
```

## Styling

All transformer styles are defined in `src/components/ContentfulRichText/RichText.astro`:

- **Diff**: Green background for additions, red for removals, with +/- indicators
- **Highlight**: Subtle gray background
- **Focus**: Blur effect on non-focused lines, clears on hover
- **Error/Warning**: Colored backgrounds with left border

## Learn More

- [Shiki Transformers Documentation](https://shiki.style/packages/transformers)
- [Astro Syntax Highlighting Guide](https://docs.astro.build/en/guides/syntax-highlighting/)
