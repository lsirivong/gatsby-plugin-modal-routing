import React from "react"
import Layout from "./layout"

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

export default ConditionalLayout
