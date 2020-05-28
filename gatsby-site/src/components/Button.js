import React from "react"
import styled from 'styled-components';

import './global.css'

const Container = styled.a`
  background: var(--sunrise-yellow);
  border: 1px solid var(--sunrise-grey);
  color: var(--sunrise-gray);
  height: inherit;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Button = ({ label, href }) => {
  return <Container
      target="_blank"
      href={href}>
      <span>{label}</span>
    </Container>;
}

export default Button;