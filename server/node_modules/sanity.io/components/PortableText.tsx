const BlockContent = require('@sanity/block-content-to-react')
import { Block as SanityBlock } from "../types/sanity";
import Block from "./portableText/Block";
import ListBlock from "./portableText/List";
import * as React from 'react';

interface Props {
  blocks: SanityBlock[];
}
const serializers = {
  list: ListBlock,
  types: {
    block: Block,
  },
  marks: {
    link: (props: any) => {
      return <a href={props.mark.href}>{props.children}</a>;
    },
  },
};

export default function PortableText(props: Props) {
  const { blocks } = props;
  return (
    <div>
      <BlockContent blocks={blocks} serializers={serializers} />
    </div>
  );
}
