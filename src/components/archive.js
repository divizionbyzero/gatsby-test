import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'


const POST_ARCHIVE_QUERY = graphql`
    query BlogPostArchive {
        allMarkdownRemark(limit: 3, sort: {
            order: DESC,
            fields: [frontmatter___date]
          }) {
        totalCount
        edges {
            node {
            excerpt
            frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YY")
            }
            }
        }
        }
    }
`;

const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({ allMarkdownRemark })=> (
      <>
        <Wrap>
            <h3>Archive</h3>
            <ul>
                {allMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                    <Link to={`/posts${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
                        <ItemWrap>
                            <ItemDate>{node.frontmatter.date}</ItemDate>
                            <p>{node.excerpt}</p>
                        </ItemWrap>
                    </li>
                ))}
            </ul>
        </Wrap>
      </>
    )}
  />
)

Archive.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Archive

const Wrap = styled.aside`
    width: 300px;
`

const ItemWrap = styled.div`
    margin-bottom: 2rem;
`

const ItemDate = styled.span`
    font-size: 14px;
    opacity: 0.5;
`
