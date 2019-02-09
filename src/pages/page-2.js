import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ConditionalLayout = ({ condition, ...rest }) => (
  condition ? (
    <Layout { ...rest } />
  ) : (
    <React.Fragment { ...rest } />
  )
)

const SecondPage = ({ modal = false, modalCloseTo = null }) => (
  <ConditionalLayout condition={!modal}>
    {modal && (
      <Link to={modalCloseTo}>
        Close
      </Link>
    )}
    <SEO title="Page two" />
    <h1>Hi from the second page {modal && "MODAL!"}</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </ConditionalLayout>
)

export default SecondPage
