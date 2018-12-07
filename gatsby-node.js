const path = require('path');

exports.createPages = ( {graphql, actions: {createPage}} ) => {
    return new Promise((resolve, reject) => {
        graphql(`
        {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    slug
                  }
                }
              }
            }
          }
        `).then(results => {
            results.data.allMarkdownRemark.edges.map(({node : {frontmatter}}) => {
                createPage({
                    path: `/posts${frontmatter.slug}`,
                    component: path.resolve('./src/components/postLayout.js'),
                    context: {
                        slug: frontmatter.slug,
                    }
                })
            });
            resolve();
        })
    })
}