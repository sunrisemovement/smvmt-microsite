import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import About from "../components/About"
import Documents from "../components/Documents"
import Events from "../components/Events"
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
  console.log(data)

  return (
    <Layout
      hubName={data.hub.name}
      socialMediaMap={
        new Map([
          ["facebook", data.hub.facebook],
          ["instagram", data.hub.instagram],
          ["email", data.hub.email],
        ])
      }>
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
        {data.events.nodes.length && <Events events={data.events.nodes} />}
        <Documents documents={data.hub.documents} />
      </MainContent>
    </Layout>
  )
}

export default HubTemplate

/**
 * @typedef {Object} DocumentQuery
 * @property {string} id
 * @property {string} name
 * @property {string} publicURL
 *
 * @typedef {Object} HubQuery
 * @property {string} name
 * @property {string} about
 * @property {string} email
 * @property {string | null} facebook
 * @property {string | null} instagram
 * @property {string | null} twitter
 * @property {string | null} website
 * @property {Object} logo
 * @property {import("gatsby-image").GatsbyImageProps} logo.childImageSharp
 * @property {Object} hero
 * @property {import("gatsby-image").GatsbyImageProps} hero.childImageSharp
 * @property {Array<DocumentQuery>} documents
 *
 * @typedef {Object} EventQuery
 * @property {string} id
 * @property {string} location
 * @property {string} title
 * @property {string} start
 * @property {string | null} infoLink
 *
 * @typedef {Object} PageQuery
 * @property {HubQuery} hub
 * @property {Object} events
 * @property {Array<EventQuery>} events.nodes
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
    events: allEvent(filter: { hub: { id: { eq: $id } } }) {
      nodes {
        id
        location
        title
        start
        infoLink
      }
    }
    hub(id: { eq: $id }) {
      name
      about
      email
      website
      facebook
      instagram

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
