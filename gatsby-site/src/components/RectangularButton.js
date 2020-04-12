import React from "react"
import styled from 'styled-components';

import './global.css'

const Container = styled.button`
  background: var(--sunrise-yellow);
  border: 1px solid var(--sunrise-grey);
  height: inherit;
  text-align: center;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  text-align: center;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 20px;
  padding-right: 20px;
`;

function RectangularButton(props) {
  return <Container>{props.label}</Container>
}

export default RectangularButton;