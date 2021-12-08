import client, { previewClient } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `
  title,
  subTitle,
  "author": author->{name,"authorImage": authorImage.asset->url},
  coverImage,
  date,
  'slug': slug.current,
`;

const builder = imageUrlBuilder(client);
const getClient = (preview) => (preview ? previewClient : client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(_createdAt asc) {${blogFields}}[0...5]`
  );
  return results;
}

export async function getPaginatedBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(_createdAt asc) {${blogFields}}[0...5]`
  );
  return results;
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  const result = await currentClient
    .fetch(
      `*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset": asset->}
    }`,
      { slug }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));
  {
    /*}.then((res) => {
      console.log(res[0]);
      return res?.[0];
      //return preview ? res?.[1] : res?.[0];
    });*/
  }

  return result;
}
