import Reactt, { useState, useEffect } from "react";
import config from "@/config/config.json";
import Disqus from "@/helpers/Disqus";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import {
  FaRegClock,
  FaRegFolder,
  FaRegUserCircle,
} from "react-icons/fa/index.js";
import { api } from "@/lib/api/blogspot";

export default function PostSingle({ post }: any) {
  const url = new URL(location.href);
  const [blogId, setBlogId] = useState(url.searchParams.get("id"));
  const [blogData, setBlogData] = useState(post);

  async function getBlog() {
    const blogData = (await api.getBlog(blogId)()).data;
    setBlogData(blogData);
  }
  useEffect(() => {
    getBlog();
    return () => {
      console.log(blogId);
    };
  }, [blogId]);
  const { title, author, content, image, published, labels } = blogData;

  return (
    <section className="section pt-7">
      <div className="container">
        <div className="row justify-center">
          <article className="lg:col-10">
            <h1 className="h2 mb-4">{markdownify(title)}</h1>
            <ul className="mb-4">
              <li className="mr-4 inline-block">
                <a href={`/authors/${slugify(author.displayName)}`}>
                  <FaRegUserCircle className={"mr-2 -mt-1 inline-block"} />
                  {humanize(author.displayName)}
                </a>
              </li>
              <li className="mr-4 inline-block">
                <FaRegFolder className={"mr-2 -mt-1 inline-block"} />
                {labels.map((category: string, index: number) => (
                  <a href={`/categories/${slugify(category)}`}>
                    {category}
                    {index !== labels.length - 1 && "、"}
                  </a>
                ))}
              </li>
              <li className="mr-4 inline-block">
                <FaRegClock className={"mr-2 -mt-1 inline-block"} />
                {dateFormat(published)}
              </li>
            </ul>
            <div className="mb-10">{content}</div>
            <div className="row items-start justify-between">
              <div className="mb-10 flex items-center lg:col-5 lg:mb-0">
                <h5 className="mr-3">Tags :</h5>
                <ul>
                  {labels.map((tag: string) => (
                    <li className="inline-block">
                      <a
                        className="m-1 block rounded bg-theme-light px-3 py-1 hover:bg-primary hover:text-white dark:bg-darkmode-theme-light dark:hover:bg-darkmode-primary dark:hover:text-dark"
                        href={`/tags/${slugify(tag)}`}
                      >
                        {humanize(tag)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center lg:col-4">
                <h5 className="mr-3">Share :</h5>
                {/* <Share
                  className="social-icons"
                  title={title}
                  slug={post.slug}
                /> */}
              </div>
            </div>
            <Disqus className="mt-20" />
          </article>
        </div>
        {/* <!-- Related posts --> */}
        {/* <div className="section pb-0">
          <h2 className="h3 mb-12 text-center">Related Posts</h2>
          <div className="row justify-center">
            {similarPosts.map((post) => (
              <div class="lg:col-4">
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
