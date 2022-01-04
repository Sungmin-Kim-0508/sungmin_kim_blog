import { Link } from "gatsby"
import React from "react"
import slugify from "slugify"
import Bio from "./bio"
import Layout from "./layout"
import Seo from "./seo"

const BlogList = ({ data, location, titlePage = "" }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      {location.pathname === "/" && (
        <>
          <Seo title="All posts" />
          <Bio />
        </>
      )}
      {titlePage.length !== 0 && (
        <section>
          <div style={{ fontWeight: "bold" }}>{titlePage}</div>
        </section>
      )}
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                  <p>
                    {post.frontmatter.tags.map((tag, index) => {
                      const slug = slugify(tag, { lower: true })
                      return (
                        <Link
                          key={tag}
                          to={`/tags/${slug}`}
                          className="no-decoration"
                        >
                          <span className="half-circle" key={index}>
                            {tag}
                          </span>
                        </Link>
                      )
                    })}
                  </p>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogList
