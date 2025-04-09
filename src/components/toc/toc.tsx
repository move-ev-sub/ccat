'use client';

import { cn } from '@/utils';
import { HeadingNode } from '@/utils/mdx';
import Link from 'next/link';
import React from 'react';

export function TOC({ nodes }: { nodes: HeadingNode[] }) {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  React.useEffect(() => {
    const root = document.querySelector('[data-content="true"]');
    if (!root) return;

    const elements = root.children;
    const sections: Map<Element, string> = new Map();
    let currentSectionId: string | null = null;
    for (const element of elements) {
      if (element.id && (element.tagName === 'H2' || element.tagName === 'H3'))
        currentSectionId = element.id;
      if (!currentSectionId) continue;

      sections.set(element, `#${currentSectionId}`);
    }

    const visibleElements = new Set<Element>();

    const callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleElements.add(entry.target);
        } else {
          visibleElements.delete(entry.target);
        }
      }

      const firstVisibleSection = Array.from(sections.entries()).find(
        ([element]) => visibleElements.has(element)
      );
      if (!firstVisibleSection) return;
      setActiveSection(firstVisibleSection[1]);
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-56px 0px',
    });

    Array.from(sections.keys()).forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <p className="text-foreground text-lg font-medium">Inhalt</p>
      <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
        {nodes.map((node) => (
          <TOCItem key={node.value} node={node} activeId={activeSection} />
        ))}
      </ul>
    </div>
  );
}

function TOCItem({
  className,
  node,
  activeId,
  ...props
}: React.ComponentProps<'li'> & {
  node: HeadingNode;
  activeId: string | null;
}) {
  return (
    <>
      <li
        style={{
          paddingLeft: `${(node.depth - 1) * 2}rem`,
        }}
        {...props}
      >
        <Link
          href={`#${node.id}`}
          data-active={activeId === `#${node.id}`}
          className={cn(
            'rounded-md',
            'focus-indicator',
            'data-[active=true]:text-accent data-[active=true]:font-medium',
            className
          )}
        >
          {node.value}
        </Link>
      </li>
      {node.children.length > 0 &&
        node.children.map((child) => (
          <TOCItem key={child.value} node={child} activeId={activeId} />
        ))}
    </>
  );
}
