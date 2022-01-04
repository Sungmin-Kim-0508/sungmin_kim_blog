import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import setupTags from "../utils/setupTags"
import BlogList from "../components/blog-list"
import slugify from "slugify"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tags = setupTags(data.allMarkdownRemark.group)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <>
      {tags && (
        <aside className="tag-list">
          <ul>
            <h3>
              <Link to="/tags">Tags</Link>
            </h3>
            {tags.map(({ tag, totalCount }) => {
              const slug = slugify(tag, { lower: true })
              return (
                <Link key={tag} to={`/tags/${slug}`}>
                  <li key={tag}>
                    {tag} ({totalCount})
                  </li>
                </Link>
              )
            })}
          </ul>
        </aside>
      )}
      <BlogList data={data} location={location} />
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
