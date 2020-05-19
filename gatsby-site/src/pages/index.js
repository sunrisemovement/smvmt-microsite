import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import About from "../components/About"
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
        hubName={data.hub.name}
        hubWebsite={data.hub.website}
        background={
          data.hub.hero?.childImageSharp ?? data.defaultHero.childImageSharp
        }
        hubLogo={
          data.hub.logo?.childImageSharp ?? data.defaultLogo.childImageSharp
        }
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
 * @property {Object} defaultLogo
 * @property {import("gatsby-image").GatsbyImageProps} defaultLogo.childImageSharp
 * @property {Object} defaultHero
 * @property {import("gatsby-image").GatsbyImageProps} defaultHero.childImageSharp
 */

export const pageQuery = graphql`
  query IndexPage {
    defaultLogo: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "sunrise-logo.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 28) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    defaultHero: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "default-hero.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
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
