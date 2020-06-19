import React from "react"
import Section from "./Section"
import styled from "styled-components"

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  overflow-x: scroll;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Entry = styled.article`
  background-color: var(--sunrise-tan);
  color: var(--sunrise-gray);
  padding: 30px;
`

const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 5px;
`

const StartDate = styled.time`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const Location = styled.p`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
`

const InfoLink = styled.a`
  background: var(--sunrise-yellow);
  border-radius: 64px;
  display: inline-block;
  margin-top: 48px;
  color: var(--sunrise-gray);
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  padding: 10px 28px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
`

const formatDateForDisplay = input => {
  const date = new Date(input)
  const formatter = new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  return formatter.format(date)
}

const formatDateForSemantics = input => {
  const date = new Date(input)
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate()}`
}

/**
 * @typedef {Object} EventData
 * @property {string} id
 * @property {string | null} location
 * @property {string} title
 * @property {string} start
 * @property {string | null} infoLink
 *
 * @typedef {Object} EventsProps
 * @property {Array<EventData>} events
 *
 * @param {EventsProps} props
 */
export default ({ events }) => {
  return (
    <Section id="events" title="Upcoming Events">
      <Layout>
        {events.map(event => (
          <Entry key={event.id}>
            <Title>{event.title}</Title>
            <StartDate dateTime={formatDateForSemantics(event.start)}>
              {formatDateForDisplay(event.start)}
            </StartDate>
            {event.location && <Location>{event.location}</Location>}
            {event.infoLink && (
              <InfoLink href={event.infoLink} rel="bookmark">
                More info
              </InfoLink>
            )}
          </Entry>
        ))}
      </Layout>
    </Section>
  )
}
