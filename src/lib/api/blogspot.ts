import config from "@/config/config.json";
import { get } from "./https";

export function getBlogs() {
  return get(
    `/blogs/${config.blogspot.blog_id}/posts?key=${
      import.meta.env.PUBLIC_API_KEY
    }`
  );
}

export function getBlog(postId: string) {
  return get(
    `/blogs/${config.blogspot.blog_id}/posts/${postId}?key=${
      import.meta.env.PUBLIC_API_KEY
    }`
  );
}

export const api = {
  getBlog,
  getBlogs,
};
