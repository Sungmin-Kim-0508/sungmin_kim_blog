import { graphql } from "gatsby"
import React from "react"
import BlogList from "../components/blog-list"

const BlogListByTag = ({ data, pageContext, location }) => {
  const totalCount = data.allMarkdownRemark.group.find(
    item => item.tag === pageContext.tag
  ).totalCount

  if (totalCount === 0) {
    return (
      <section>
        <div>
          I found there is no tag registered in the blog post.{" "}
          <span>Please add a tag for your blog post!</span>
        </div>
      </section>
    )
  }

  const tag = pageContext.tag
  const titlePage = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return <BlogList data={data} location={location} titlePage={titlePage} />
}

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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

export default BlogListByTag
