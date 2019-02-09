import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ modal = false, modalCloseTo = null }) => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>
      <Link to="/page-2/">Go to page 2</Link>
    </p>
    <p>
      <Link to="/page-2/" state={{ modal: true }}>Page 2 in Modal</Link>
    </p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </>
)

export default IndexPage
