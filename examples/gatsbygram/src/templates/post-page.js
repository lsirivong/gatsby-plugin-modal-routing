import * as PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"
import PostDetail from "../components/post-detail"
import Layout from "../layouts"

class PostTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      postsJson: PropTypes.object.isRequired,
    }),
  }
  render() {
    const { modal } = this.props
    return (
      <Layout location={this.props.location} isModal={modal}>
        <PostDetail post={this.props.data.postsJson} />
      </Layout>
    )
  }
}

export default PostTemplate

// The post template's GraphQL query. Notice the “id”
// variable which is passed in. We set this on the page
// context in gatsby-node.js.
//
// All GraphQL queries in Gatsby are run at build-time and
// loaded as plain JSON files so have minimal client cost.
export const pageQuery = graphql`
  query($id: String!) {
    # Select the post which equals this id.
    postsJson(id: { eq: $id }) {
      ...PostDetail_details
    }
  }
`
