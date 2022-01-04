import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import Layout from "../components/layout"
import setupTags from "../utils/setupTags"

const Tags = ({ data, location }) => {
  const tags = setupTags(data.allMarkdownRemark.group)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <section>
        <h2>Tags</h2>
        <div className="tag-wrapper">
          {tags ? (
            tags.map(({ tag, totalCount }) => {
              const slug = slugify(tag, { lower: true })
              return (
                <Link
                  key={tag}
                  className="tag-list-item no-decoration"
                  to={`/tags/${slug}`}
                >
                  <span>
                    {tag} ({totalCount})
                  </span>
                </Link>
              )
            })
          ) : (
            <p>No tags found. Add the tags on the top of markdown files.</p>
          )}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default Tags
