import { useSWRPages } from "swr";
import { useGetBlogs } from "actions";
import { Col } from "react-bootstrap";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

export const useGetBlogsPages = ({ blogs: initialData, filter }) => {
  return useSWRPages(
    "index",
    ({ offset, withSWR }) => {
      const { data: blogs } = withSWR(useGetBlogs(initialData));

      if (!blogs) {
        return "Loading...";
      }

      return blogs.map((blogg) =>
        filter.view.list ? (
          <Col key={`${blogg.slug}-list`} md="9">
            <CardListItem
              author={blogg.author}
              title={blogg.title}
              subtitle={blogg.subtitle}
              date={blogg.date}
              link={{
                href: "/blogs/[slug]",
                as: `/blogs/${blogg.slug}`,
              }}
            />
          </Col>
        ) : (
          <Col key={blogg.slug} md="4">
            <CardItem
              author={blogg.author}
              title={blogg.title}
              subtitle={blogg.subtitle}
              date={blogg.date}
              coverImage={blogg.coverImage}
              link={{
                href: "/blogs/[slug]",
                as: `/blogs/${blogg.slug}`,
              }}
            />
          </Col>
        )
      );
    },
    // here you will compute offset that will get passed into previous callback function with 'withSWR'
    // SWR: data you will get from 'withSWR' function
    // index: number of current page
    (SWR, index) => {
      return 0;
    },
    [filter]
  );
};
