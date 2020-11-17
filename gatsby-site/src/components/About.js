import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Section from "./Section"

const containsHtmlTags = (s) => {
  return s.includes("<") && s.includes(">");
}

const Body = styled.div`
  font-family: var(--sunrise-font-serif);
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 1.5;
  color: #000;
`

const Paragraph = styled.p`
  &:last-child {
    margin-bottom: 0;
  }
`

/**
 * @typedef {Object} AboutProps
 * @property {string} content
 * @property {string} hubName
 *
 * @param {AboutProps} props
 */
const About = ({ hubName, content }) => {
  if (containsHtmlTags(content)) {
    return (
      <Section id="about" title={`About Sunrise ${hubName}`} style="overflow: visible;">
        <Body dangerouslySetInnerHTML={{__html: content}}>
        </Body>
      </Section>
    )
  } else {
    return (
      <Section id="about" title={`About Sunrise ${hubName}`}>
        <Body>
          {content
            .split(/\n\n+/)
            .filter(entry => entry)
            .map((entry, index) => (
              <Paragraph key={index}>{entry}</Paragraph>
            ))}
        </Body>
      </Section>
    )
  }
}

About.propTypes = {
  content: PropTypes.string.isRequired,
  hubName: PropTypes.string.isRequired,
}

export default About
