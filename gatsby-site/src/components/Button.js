import React from "react"
import styled from "styled-components"

import "./global.css"

const Container = styled.a`
  background: var(--sunrise-yellow);
  color: var(--sunrise-grey);
  display: inline-block;
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
`

const Button = ({ label, href }) => {
  return (
    <Container target="_blank" href={href}>
      <span>{label}</span>
    </Container>
  )
}

export default Button
