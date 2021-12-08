import { Row, Col } from "react-bootstrap";
import PageLayout from "../components/PageLayout";
import AuthorIntro from "../components/AuthorIntro";
import CardItem from "../components/CardItem";
import CardListItem from "../components/CardListItem";
import { getAllBlogs, getPaginatedBlogs } from "../lib/api";
import FilteringMenu from "components/FilteringMenu";
import { useState } from "react";
import { useGetBlogs } from "actions";
import PreviewAlert from "components/PreviewAlert";

export default function Home({ blogs: initialData, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
  });

  const { data: blogs, error } = useGetBlogs(initialData);
  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
          //setFilter({ view: { list: 1 } });
        }}
      />
      <hr />
      <Row className="mb-5">
        {blogs?.map((blog) =>
          filter.view.list === 0 ? (
            <Col key={blog.title} md="4">
              <CardItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subTitle}
                coverimage={blog.coverImage}
                date={blog.date}
                link={{
                  href: "/blogs/[slug]",
                  as: `/blogs/${blog.slug}`,
                }}
              />
              {console.log(blog.slug)}
            </Col>
          ) : (
            <Col key={blog.title} md="9">
              <CardListItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subTitle}
                date={blog.date}
                link={{
                  href: "/blogs/[slug]",
                  as: `/blogs/${blog.slug}`,
                }}
              />
              {console.log(blog.slug)}
            </Col>
          )
        )}
      </Row>
    </PageLayout>
  );
}

//This fun is called during the build
//provides props to your page
//it will create static page
export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs();
  return {
    props: {
      blogs,
      preview,
    },
  };
}

{
  //Server side rendring method i.e dynamic
  /*export async function getServerSideProps() {
  console.log("server calling api");
  const randomNumber = Math.random();
  console.log(" Server Hello api = "+randomNumber);
  const blogs = await getAllBlogs();
  return {
    props: {
      blogs,
      randomNumber
    },
  };
}*/
}
