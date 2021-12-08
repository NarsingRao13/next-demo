import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/HighlightCode";
import { urlFor } from "lib/api";

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => {
      return (
        <HighlightCode language={language}>
          {code}
          <div className="code-filename">{filename}</div>
        </HighlightCode>
      );
    },
    image: ({ node: { asset, alt, imagePosition = "center" } }) => {
      // let style = {};
      // debugger;
      // if (imagePosition === "left") {
      //   style.float = imagePosition;
      //   style.marginRight = "30px";
      // }
      // if (imagePosition === "right") {
      //   style.float = imagePosition;
      //   style.marginLeft = "30px";
      // }
      return (
        <div className={`blog-image  blog-image-${imagePosition}`}>
          <img src={urlFor(asset).height(300).fit("max").url()} />
          <div className="image-alt">{alt}</div>
        </div>
      );
    },
  },
};

const BlogContent = ({ content }) => (
  <BlockContent serializers={serializers} blocks={content} />
);

export default BlogContent;
