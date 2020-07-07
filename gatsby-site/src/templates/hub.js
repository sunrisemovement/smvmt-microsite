import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import About from "../components/About"
import Documents from "../components/Documents"
import Events from "../components/Events"
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
  const hasContent = React.useMemo(() => {
    return (
      data.hub.documents.length !== 0 ||
      data.events.nodes.length !== 0 ||
      Boolean(data.hub.signup) ||
      Boolean(data.hub.about)
    )
  }, [data])

  return (
    <Layout
      hubName={data.hub.name}
      donations={data.hub.donations}
      socialMediaMap={
        new Map([
          ["twitter", data.hub.twitter],
          ["facebook", data.hub.facebook],
          ["instagram", data.hub.instagram],
          ["email", data.hub.email ? `mailto:${data.hub.email}` : null],
        ])
      }>
      <Hero
        dense={hasContent}
        name={data.hub.name}
        website={data.hub.website}
        websiteText={data.hub.websiteText}
        background={
          data.hub.hero?.childImageSharp ?? data.defaultHero.childImageSharp
        }
        logo={
          data.hub.logo?.childImageSharp ?? data.defaultLogo.childImageSharp
        }
      />
      {hasContent && (
        <MainContent>
          {data.hub.about && (
            <About hubName={data.hub.name} content={data.hub.about} />
          )}
          {data.events.nodes.length !== 0 && (
            <Events events={data.events.nodes} />
          )}
          {data.hub.documents.length !== 0 && (
            <Documents documents={data.hub.documents} />
          )}
          {data.hub.signup && <Newsletter link={data.hub.signup} />}
        </MainContent>
      )}
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
 * @property {string | null} email
 * @property {string | null} hub.signup
 * @property {string | null} facebook
 * @property {string | null} instagram
 * @property {string | null} twitter
 * @property {string | null} website
 * @property {string | null} donations
 * @property {string | null} websiteText
 * @property {Object} logo
 * @property {import("gatsby-image").GatsbyImageProps} logo.childImageSharp
 * @property {Object} hero
 * @property {import("gatsby-image").GatsbyImageProps} hero.childImageSharp
 * @property {Array<DocumentQuery>} documents
 *
 * @typedef {Object} EventQuery
 * @property {string} id
 * @property {string | null} location
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
      relativePath: { eq: "sunrise-logo-padded.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 150) {
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
      twitter
      facebook
      instagram
      signup
      donations
      websiteText
      logo {
        childImageSharp {
          fluid(maxWidth: 150) {
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
