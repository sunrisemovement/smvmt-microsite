import React from "react"
import styled from "styled-components"

const Container = styled.section`
  position: relative;
  overflow: hidden;
`

const Heading = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sunrise-grey);
  padding-bottom: 20px;
  margin: 0;
`

/**
 * @typedef {Object} SectionProps
 * @property {string} id
 * @property {string} title
 * @property {React.ReactNode} children
 *
 * @param {SectionProps} props
 */
const Section = ({ id, title, children }) => {
  return (
    <Container>
      <Heading id={id}>{title}</Heading>
      <div>{children}</div>
    </Container>
  )
}

export default Section
