import React from "react"
import SunriseLogo from "./SunriseLogo"
import styled from 'styled-components';

import './global.css'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: var(--sunrise-grey);
  height: inherit;
  align-items: center;
  padding-left: 8%;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const Logo = styled.div`
  padding-top: 3px;
  height: 30px;
  width: 18px;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 23px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-style: bold;
  padding-left: 8px;
  color: var(--sunrise-yellow);
`;

function SunriseHeader(props) {
	return <Container>
	  <Logo><SunriseLogo /></Logo>
	  <Title>Sunrise Movement</Title>
	</Container>
}

export default SunriseHeader;