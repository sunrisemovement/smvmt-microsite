import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Section = styled.section`
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
  color: var(--sunrise-gray);
  padding-bottom: 16px;
  margin: 0;
`

const Body = styled.div`
  font-family: var(--sunrise-font-serif);
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 1.5;
  color: #000;
`

/**
 * @typedef {Object} AboutProps
 * @property {string} content
 * @property {string} hubName
 *
 * @param {AboutProps} props
 */
const About = ({ hubName, content }) => {
  return (
    <Section>
      <Heading>About Sunrise {hubName}</Heading>
      <Body>{content}</Body>
    </Section>
  )
}

About.propTypes = {
  content: PropTypes.string.isRequired,
  hubName: PropTypes.string.isRequired,
}

export default About
