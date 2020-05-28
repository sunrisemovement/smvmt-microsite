/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SunriseFooter from "./SunriseFooter"
import SunriseHeader from "./SunriseHeader"
import "./layout.css"

const Layout = ({ hubName, socialMediaMap, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <SunriseHeader />
      <main>{children}</main>
      <SunriseFooter hubName={hubName} socialMediaMap={socialMediaMap} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
