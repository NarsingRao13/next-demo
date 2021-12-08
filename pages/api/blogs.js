import { getPaginatedBlogs } from "/lib/api";

export default async function getBlogs(req, res) {
  const data = await getPaginatedBlogs();
  res.status(200).json(data);
}
