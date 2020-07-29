import React from "react"
import { useLocation, Redirect } from "@reach/router"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => {
  const location = useLocation()

  const shouldRedirect = React.useMemo(() => {
    return location.pathname.toLowerCase() !== location.pathname
  }, [location.pathname])

  if (shouldRedirect) {
    return <Redirect to={location.pathname.toLowerCase()} />
  }

  return (
    <div>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

export default NotFoundPage
