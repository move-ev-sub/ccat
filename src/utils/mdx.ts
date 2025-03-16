// TODO: Typechecking is disabled here because of the `unified` library.
// It's a bit tricky to get the types right.
/* eslint @typescript-eslint/no-explicit-any: 0 */

import rehypeSlug from 'rehype-slug';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

export type HeadingNode = {
  id: string;
  depth: number;
  value: string;
  children: HeadingNode[];
};

export async function extractHeadings(
  mdxContent: string
): Promise<HeadingNode[]> {
  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
    .use(rehypeSlug) // This will add IDs to headings
    .runSync(unified().use(remarkParse).use(remarkMdx).parse(mdxContent));

  const headings: HeadingNode[] = [];
  const stack: HeadingNode[] = [];

  visit(tree, 'element', (node: any) => {
    if (!node.tagName.match(/^h[1-6]$/)) {
      return;
    }

    const depth = parseInt(node.tagName.charAt(1), 10);

    const value = node.children
      .map((child: any) => (child.type === 'text' ? child.value : ''))
      .join('');

    const heading: HeadingNode = {
      depth: depth,
      value,
      children: [],
      id: node.properties.id ?? '',
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      headings.push(heading);
    } else {
      stack[stack.length - 1].children.push(heading);
    }

    stack.push(heading);
  });

  return headings;
}
