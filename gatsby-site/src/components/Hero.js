import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"
import styled from "styled-components"

const Section = styled.section`
  position: relative;
  overflow: hidden;
`

const BackgroundImage = styled(Image)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
`

/** @param {{ dense?: boolean }} props */
const contentPadding = props =>
  props.dense ? "60px 32px 108px" : "190px 32px 354px"

const Content = styled.div`
  position: relative;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  padding: ${contentPadding};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const LogoContainer = styled.div`
  width: 82px;
  height: 82px;
  background-color: var(--sunrise-grey);
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  padding: 6px;
`

const LogoImage = styled(Image)`
  width: ${(Math.sqrt(2) / 2) * 100}%;
  height: ${(Math.sqrt(2) / 2) * 100}%;
`

const Headline = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 60px;
  text-transform: uppercase;
  color: var(--sunrise-yellow);
  margin: 0;
`

const WebsiteLink = styled.a`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sunrise-grey);
  text-decoration: none;
  height: 68px;
  background-color: var(--sunrise-yellow);
  display: flex;
  align-items: center;
  padding: 0 40px;
  margin-top: 32px;
`

/**
 * @typedef {Object} HeroProps
 * @property {boolean} dense
 * @property {import("gatsby-image").GatsbyImageProps} background
 * @property {import("gatsby-image").GatsbyImageProps} hubLogo
 * @property {string} hubName
 * @property {string | null} hubWebsite
 *
 * @param {HeroProps} props
 */
const Hero = ({ dense, background, hubLogo, hubName, hubWebsite }) => {
  return (
    <Section>
      <BackgroundImage {...background} style={{ position: "absolute" }} />
      <Content dense={dense}>
        <LogoContainer>
          <LogoImage {...hubLogo} imgStyle={{ objectFit: "contain" }} />
        </LogoContainer>
        <Headline>Sunrise Movement {hubName}</Headline>
        {hubWebsite && (
          <WebsiteLink href={hubWebsite}>
            Visit Sunrise {hubName}’s full website
          </WebsiteLink>
        )}
      </Content>
    </Section>
  )
}

export default Hero
