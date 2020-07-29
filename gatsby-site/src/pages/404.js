import React from "react"
import { useLocation, useNavigate } from "@reach/router"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  React.useLayoutEffect(() => {
    if (location.pathname.toLowerCase() === location.pathname) return
    navigate(location.pathname.toLowerCase())
  }, [location.pathname, navigate])

  return (
    <div>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

export default NotFoundPage
