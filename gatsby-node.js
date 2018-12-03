const path = require('path');

exports.createPages = ( {graphql, actions: {createPage}} ) => {
    createPage({
        path: '/somefakepage',
        component: path.resolve('./src/components/postLayout.js')
    })
}