import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import About from "../components/About"
import Documents from "../components/Documents"
import Newsletter from "../components/Newsletter"
import { graphql } from "gatsby"

const MainContent = styled.div`
  max-width: 756px;
  padding: 80px 16px;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 80px;
`

/**
 * @typedef {Object} HubTemplateProps
 * @property {PageQuery} data
 *
 * @param {HubTemplateProps} props
 */
const HubTemplate = ({ data }) => {
  const socialMediaMap = new Map()
  socialMediaMap.set("facebook", data.hub.facebook)
  socialMediaMap.set("instagram", data.hub.instagram)
  socialMediaMap.set("email", data.hub.email)
  return (
    <Layout hubName={data.hub.name} socialMediaMap={socialMediaMap}>
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
        <About hubName={data.hub.name} content={data.hub.about} />
        <Documents documents={data.hub.documents} />
        {data.hub.signup && <Newsletter link={data.hub.signup} />}
      </MainContent>
    </Layout>
  )
}

export default HubTemplate

/**
 * @typedef {Object} Document
 * @property {string} id
 * @property {string} name
 * @property {string} publicURL
 *
 * @typedef {Object} PageQuery
 * @property {Object} hub
 * @property {string} hub.name
 * @property {string} hub.about
 * @property {string | null} hub.website
 * @property {string | null} hub.signup
 * @property {Object} hub.logo
 * @property {import("gatsby-image").GatsbyImageProps} hub.logo.childImageSharp
 * @property {Object} hub.hero
 * @property {import("gatsby-image").GatsbyImageProps} hub.hero.childImageSharp
 * @property {Array<Document>} hub.documents
 * @property {Object} defaultLogo
 * @property {import("gatsby-image").GatsbyImageProps} defaultLogo.childImageSharp
 * @property {Object} defaultHero
 * @property {import("gatsby-image").GatsbyImageProps} defaultHero.childImageSharp
 */

export const pageQuery = graphql`
  query IndexPage($id: String!) {
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
    hub(id: { eq: $id }) {
      name
      about
      email
      website
      facebook
      instagram
      signup
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
      documents {
        id
        name
        publicURL
      }
    }
  }
`
