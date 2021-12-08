import PageLayout from "../../components/PageLayout";
import { useRouter } from "next/router";
import { getBlogBySlug, getAllBlogs, getPaginatedBlogs } from "lib/api";
import { Row, Col } from "react-bootstrap";
import BlogHeader from "../../components/BlogHeader";
import BlogContent from "../../components/BlogContent";
import { urlFor } from "lib/api";
import ErrorPage from "next/error";
import PreviewAlert from "components/PreviewAlert";

const BlogDetails = ({ blog, preview }) => {
  const router = useRouter();
  //debugger;
  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }

  if (router.isFallback) {
    return <PageLayout>Loading..</PageLayout>;
  }

  console.log("Displaying page");
  return (
    <PageLayout>
      {/* <h1>
        Hello Details Page - {blog?.slug} - {blog?.title}
      </h1> */}
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview && <PreviewAlert />}
          <BlogHeader
            title={blog?.title}
            subtitle={blog?.subtitle}
            coverImage={urlFor(blog?.coverImage).height(300).url()}
            date={blog?.date}
            author={blog?.author}
          />
          <hr />
          <BlogContent content={blog.content} />
        </Col>
      </Row>
    </PageLayout>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  console.log("preview is  " + preview);
  //console.log("previewData is  " + previewData.message);
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { blog, preview },
  };
}

export async function getStaticPaths() {
  const blogs = await getPaginatedBlogs();
  const paths = blogs?.map((b) => {
    return {
      params: { slug: b.slug },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export default BlogDetails;
