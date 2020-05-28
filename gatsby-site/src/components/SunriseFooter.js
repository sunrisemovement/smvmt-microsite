import React from "react"
import styled from 'styled-components';
import Button from "./Button";

import './global.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--sunrise-grey);
  height: inherit;
  padding-top: 35px;
  padding-bottom: 35px;
  align-items: center;
`;

const SunriseFooter = ({ hubName }) => {
  return <Container>
    <Button label={`Donate to Sunrise ${hubName}`} href="https://secure.actblue.com/donate/sunrisemvmt" />
  </Container>;
}

export default SunriseFooter; 