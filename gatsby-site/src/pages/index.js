import React from "react"
import Layout from "../components/layout"
import Hero from "../components/Hero"

// @ts-ignore
import photoPlaceholderPath from "../images/photo-placeholder.svg"
// @ts-ignore
import sunriseLogoPath from "../images/sunrise-logo.png"

const IndexPage = () => (
  <Layout>
    <Hero
      dense
      background={photoPlaceholderPath}
      hubLogo={sunriseLogoPath}
      hubName="PDX"
      hubWebsite="https://www.sunrisepdx.org"
    />
  </Layout>
)

export default IndexPage
