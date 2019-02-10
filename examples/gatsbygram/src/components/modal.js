import React from "react"
import CaretRight from "react-icons/lib/fa/caret-right"
import CaretLeft from "react-icons/lib/fa/caret-left"
import Close from "react-icons/lib/md/close"
import findIndex from "lodash/findIndex"
import mousetrap from "mousetrap"
import * as PropTypes from "prop-types"
import { navigate, StaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

let posts

class GatsbyGramModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    mousetrap.bind(`left`, () => this.previous())
    mousetrap.bind(`right`, () => this.next())
    mousetrap.bind(`spacebar`, () => this.next())
  }

  componentWillUnmount() {
    mousetrap.unbind(`left`)
    mousetrap.unbind(`right`)
    mousetrap.unbind(`spacebar`)
  }

  findCurrentIndex() {
    let index
    index = findIndex(
      posts,
      post => post.id === this.props.location.pathname.split(`/`)[1]
    )

    return index
  }

  next(e) {
    if (e) {
      e.stopPropagation()
    }
    const currentIndex = this.findCurrentIndex()
    if (currentIndex || currentIndex === 0) {
      let nextPost
      // Wrap around if at end.
      if (currentIndex + 1 === posts.length) {
        nextPost = posts[0]
      } else {
        nextPost = posts[currentIndex + 1]
      }
      navigate(`/${nextPost.id}/`, { state: { modal: true }})
    }
  }

  previous(e) {
    if (e) {
      e.stopPropagation()
    }
    const currentIndex = this.findCurrentIndex()
    if (currentIndex || currentIndex === 0) {
      let previousPost
      // Wrap around if at start.
      if (currentIndex === 0) {
        previousPost = posts.slice(-1)[0]
      } else {
        previousPost = posts[currentIndex - 1]
      }
      navigate(`/${previousPost.id}/`, { state: { modal: true }})
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allPostsJson {
              edges {
                node {
                  id
                }
              }
            }
          }
        `}
        render={data => {
          if (!posts) {
            posts = data.allPostsJson.edges.map(e => e.node)
          }
          return (
            <div
              onClick={() => navigate(`/`)}
              css={{
                display: `flex`,
                position: `relative`,
                height: `100vh`,
              }}
            >
              <div
                css={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyItems: `center`,
                  maxWidth: rhythm(40.25), // Gets it right around Instagram's maxWidth.
                  margin: `auto`,
                  width: `100%`,
                }}
              >
                <CaretLeft
                  data-testid="previous-post"
                  css={{
                    cursor: `pointer`,
                    fontSize: `50px`,
                    color: `rgba(255,255,255,0.7)`,
                    userSelect: `none`,
                  }}
                  onClick={e => this.previous(e)}
                />
                {this.props.children}
                <CaretRight
                  data-testid="next-post"
                  css={{
                    cursor: `pointer`,
                    fontSize: `50px`,
                    color: `rgba(255,255,255,0.7)`,
                    userSelect: `none`,
                  }}
                  onClick={e => this.next(e)}
                />
              </div>
              <Close
                data-testid="modal-close"
                onClick={() => navigate(`/`)}
                css={{
                  cursor: `pointer`,
                  color: `rgba(255,255,255,0.8)`,
                  fontSize: `30px`,
                  position: `absolute`,
                  top: rhythm(1 / 4),
                  right: rhythm(1 / 4),
                }}
              />
            </div>
          )
        }}
      />
    )
  }
}

export default GatsbyGramModal
