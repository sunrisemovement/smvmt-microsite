import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import About from "../components/About"

// @ts-ignore
import photoPlaceholderPath from "../images/photo-placeholder.svg"
// @ts-ignore
import sunriseLogoPath from "../images/sunrise-logo.png"

const MainContent = styled.div`
  max-width: 756px;
  padding: 80px 16px;
  margin: 0 auto;
`

const IndexPage = () => (
  <Layout>
    <Hero
      dense
      background={photoPlaceholderPath}
      hubLogo={sunriseLogoPath}
      hubName="PDX"
      hubWebsite="https://www.sunrisepdx.org"
    />
    <MainContent>
      <About
        hubName="PDX"
        content={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      />
    </MainContent>
  </Layout>
)

export default IndexPage
