import React from "react"
import SunriseLogo from "./SunriseLogo"
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: '100%';
  background-color: #33342E;
  height: 110px;
  align-items: center;
`;

const Logo = styled.div`
  padding-top: 3px;
  height: 30px;
  width: 18px;
  margin-left: 120px;
  margin-right: 8px;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 23px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-style: bold;
  color: #FFDE16;
`;

function SunriseHeader(props) {
	return <Container>
	  <Logo><SunriseLogo /></Logo>
	  <Title>Sunrise Movement</Title>
	</Container>
}

export default SunriseHeader;