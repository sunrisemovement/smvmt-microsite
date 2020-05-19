import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import About from "../components/About"

// @ts-ignore
import photoPlaceholderPath from "../images/photo-placeholder.svg"
// @ts-ignore
import sunriseLogoPath from "../images/sunrise-logo.png"
import { graphql } from "gatsby"

const MainContent = styled.div`
  max-width: 756px;
  padding: 80px 16px;
  margin: 0 auto;
`

/**
 * @typedef {Object} IndexPageProps
 * @property {PageQuery} data
 *
 * @param {IndexPageProps} props
 */
const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Hero
        dense
        background={data.hub.hero.childImageSharp}
        hubLogo={data.hub.logo.childImageSharp}
        hubName={data.hub.name}
        hubWebsite={data.hub.website}
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
}

export default IndexPage

/**
 * @typedef {Object} PageQuery
 * @property {Object} hub
 * @property {string} hub.name
 * @property {string | null} hub.website
 * @property {Object} hub.logo
 * @property {import("gatsby-image").GatsbyImageProps} hub.logo.childImageSharp
 * @property {Object} hub.hero
 * @property {import("gatsby-image").GatsbyImageProps} hub.hero.childImageSharp
 */

export const pageQuery = graphql`
  query IndexPage {
    hub {
      name
      website
      logo {
        childImageSharp {
          fluid(maxWidth: 28) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      hero {
        childImageSharp {
          fluid(maxWidth: 1440) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
