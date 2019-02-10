import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ConditionalLayout = ({ condition, children, ...rest }) => (
  condition ? (
    <Layout { ...rest }>
      {children}
    </Layout>
  ) : (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
)

const SecondPage = ({ location, modal = false, modalCloseTo = null }) => (
  <ConditionalLayout location={location} condition={!modal}>
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
