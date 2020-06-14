import React from "react"
import Section from "./Section"
import styled from "styled-components"

const Grid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
`

const DownloadLink = styled.a`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sunrise-grey);
  fill: currentColor;
  stroke: currentColor;
  background-color: var(--sunrise-tan);
  text-decoration: none;
`

/**
 * @type {React.ReactNode}
 */
const icon = (
  <svg width="13" height="17" viewBox="0 0 13 17">
    <rect
      x="0.619048"
      y="1.38077"
      width="11.7619"
      height="14.2381"
      rx="1.85714"
      strokeWidth="1.2381"
      fill="none"
    />
    <rect
      x="2.4762"
      y="4.47614"
      width="8.04762"
      height="1.2381"
      stroke="none"
    />
    <rect
      x="2.4762"
      y="7.57135"
      width="8.04762"
      height="1.2381"
      stroke="none"
    />
    <rect
      x="2.4762"
      y="10.6666"
      width="5.57143"
      height="1.2381"
      stroke="none"
    />
  </svg>
)

/**
 * @typedef {Object} Document
 * @property {string} id
 * @property {string} publicURL
 * @property {string} name
 *
 * @typedef {Object} DocumentsProps
 * @property {Array<Document>} documents
 *
 * @param {DocumentsProps} props
 */
const Documents = ({ documents }) => {
  return (
    <Section id="documents" title="Documents">
      <Grid>
        {documents.map(document => (
          <DownloadLink
            target="_blank"
            key={document.publicURL}
            href={document.publicURL}>
            <span>{document.name}</span>
            {icon}
          </DownloadLink>
        ))}
      </Grid>
    </Section>
  )
}

export default Documents
