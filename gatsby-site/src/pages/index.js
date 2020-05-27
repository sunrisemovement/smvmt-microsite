import React from "react"
import Helmet from "react-helmet"

export default () => {
  return (
    <>
      <Helmet>
        <meta
          httpEquiv="refresh"
          content="0; URL=https://sunrisemovement.org/hubs"
        />
        <link rel="canonical" href="https://sunrisemovement.org/hubs" />
      </Helmet>
      <div>Redirecting...</div>
    </>
  )
}
