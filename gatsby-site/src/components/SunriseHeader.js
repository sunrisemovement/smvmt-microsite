import React from "react"
import SunriseLogo from "./SunriseLogo"
import styled from "styled-components"

import "./global.css"

const Outer = styled.header`
  background-color: var(--sunrise-grey);
  position: relative;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: inherit;
  align-items: center;
  justify-content: space-between;
  padding: 25px 120px;
  margin: 0 auto;
  max-width: 1440px;
  @media (max-width: 768px) {
    padding: 25px 32px;
    justify-content: center;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const LogoImage = styled.div`
  padding-top: 3px;
  height: 30px;
  width: 18px;
`

const Title = styled.a`
  text-transform: uppercase;
  font-size: 23px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 700;
  font-style: bold;
  padding-left: 8px;
  color: var(--sunrise-yellow);
  text-decoration: none;
`

const BackToNationalLink = styled.a`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  justify-self: flex-end;
  color: var(--sunrise-yellow);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

function SunriseHeader(props) {
  return (
    <Outer>
      <Container>
        <Logo>
          <LogoImage>
            <SunriseLogo />
          </LogoImage>
          <Title href="https://www.sunrisemovement.org">Sunrise Movement</Title>
        </Logo>
        <BackToNationalLink href="https://www.sunrisemovement.org">
          Back to Sunrise National
        </BackToNationalLink>
      </Container>
    </Outer>
  )
}

export default SunriseHeader
