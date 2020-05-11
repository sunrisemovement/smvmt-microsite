import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Section = styled.section`
  position: relative;
  overflow: hidden;
`

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  padding: ${({ dense }) => dense ? "60px 32px 108px" : "190px 32px 354px"};
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
`

const LogoImage = styled.img`
  width: 32.5%;
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
  color: var(--sunrise-gray);
  text-decoration: none;
  height: 68px;
  background-color: var(--sunrise-yellow);
  display: flex;
  align-items: center;
  padding: 0 40px;
  margin-top: 32px;
`

const Hero = ({ dense, background, hubLogo, hubName, hubWebsite }) => {
  return (
    <Section>
      <BackgroundImage src={background} />
      <Content dense={dense}>
        <LogoContainer>
          <LogoImage src={hubLogo} />
        </LogoContainer>
        <Headline>
          Sunrise Movement {hubName}
        </Headline>
        {hubWebsite && (
          <WebsiteLink href={hubWebsite}>
            Visit Sunrise {hubName}’s full website
          </WebsiteLink>
        )}
      </Content>
    </Section>
  )
}

Hero.propTypes = {
  dense: PropTypes.bool,
  background: PropTypes.string.isRequired,
  hubLogo: PropTypes.string.isRequired,
  hubName: PropTypes.string.isRequired,
  hubWebsite: PropTypes.string,
}

Hero.defaultProps = {
  dense: false,
}

export default Hero
