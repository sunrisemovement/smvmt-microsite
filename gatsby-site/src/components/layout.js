/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SunriseHeader from "./SunriseHeader"
import SunriseFooter from "./SunriseFooter"
import styled from 'styled-components';
import "./layout.css"

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
`;

function Layout(props) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const socialMediaMap = new Map();
  {/* TO-DO: use info from config to build this map */}
  socialMediaMap.set('instagram', 'https://www.instagram.com/sunrisemvmt/');
  socialMediaMap.set('email', 'mailto:team@sunrisemovement.org');

  return (
    <LayoutContainer>
      <SunriseHeader />
      <Content>{props.children}</Content>
      <SunriseFooter socialMediaMap={socialMediaMap}/>
    </LayoutContainer>
  )
}

export default Layout
