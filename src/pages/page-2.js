import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

const SecondPage = ({ modal = false, modalCloseTo = null }) => (
  <>
    {modal && (
      <Link to={modalCloseTo}>
        Close
      </Link>
    )}
    <SEO title="Page two" />
    <h1>Hi from the second page {modal && "MODAL!"}</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </>
)

export default SecondPage
