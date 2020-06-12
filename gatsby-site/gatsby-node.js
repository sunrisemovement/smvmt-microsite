const fetch = require("node-fetch").default
const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

/**
 * @typedef {Object} RemoteFileThumbnail
 * @property {number} height
 * @property {number} width
 * @property {string} url
 */

/**
 * @typedef {Object} RemoteFile
 * @property {string} id
 * @property {string} filename
 * @property {number} size
 * @property {string} type
 * @property {string} url
 * @property {Object} thumbnails
 * @property {RemoteFileThumbnail | undefined} thumbnails.small
 * @property {RemoteFileThumbnail | undefined} thumbnails.large
 * @property {RemoteFileThumbnail | undefined} thumbnails.full
 */

/**
 * @typedef {Object} HubLeader
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 */

/**
 * @typedef {Object} Hub
 * @property {string} id
 * @property {string} name
 * @property {string} about
 * @property {string} city
 * @property {string} state
 * @property {string} email
 * @property {string | null} custom_weblink_text
 * @property {string | null} website
 * @property {string | null} facebook
 * @property {string | null} instagram
 * @property {string | null} twitter
 * @property {string | null} signup_link
 * @property {Array<HubLeader>} leaders
 * @property {Array<RemoteFile> | null | undefined} documents
 * @property {Array<RemoteFile> | null | undefined} images
 * @property {Array<RemoteFile> | null | undefined} hero_image
 * @property {Array<RemoteFile> | null | undefined} logo_image
 */

/**
 * @typedef {Object} HubhubPayload
 * @property {string} updated_at
 * @property {Array<Hub>} map_data
 */

/**
 * @typedef {Object} Event
 * @property {string} address
 * @property {string} city
 * @property {string} description
 * @property {string} end_date
 * @property {string} event_source
 * @property {string} event_title
 * @property {'Phonebank' | 'Canvass' | 'Climate Strike' | 'Rally' | 'Meeting'} event_type
 * @property {string | undefined} hub_id
 * @property {number} latitude
 * @property {number} longitude
 * @property {string | null} registration_link
 * @property {string} start_date
 * @property {string} location_name
 * @property {string} state
 * @property {string} zip_code
 */

/**
 * @typedef {Object} EventsPayload
 * @property {Array<Event>} map_data
 * @property {string} updated_at
 */

const HUBS_ENDPOINT =
  "https://sunrise-hub-json-staging.s3.amazonaws.com/hubs.json"
const EVENTS_ENDPOINT =
  "https://sunrise-hub-json-staging.s3.amazonaws.com/events.json"

/**
 * @param {import("gatsby").CreatePagesArgs} helpers
 */
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query CreatePagesForHubs {
      allHub {
        nodes {
          id
          slug
        }
      }
    }
  `)

  result.data.allHub.nodes.forEach(({ id, slug }) => {
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/hub.js`),
      context: { id },
    })
  })
}

/**
 * @param {import("gatsby").SourceNodesArgs} helpers
 */
exports.sourceNodes = async helpers => {
  const { actions, createContentDigest, createNodeId, reporter } = helpers
  const { createNode } = actions

  // EVENTS

  const eventsResponse = await fetch(EVENTS_ENDPOINT).catch(error => {
    reporter.panicOnBuild(
      `Request to events endpoint ${EVENTS_ENDPOINT} could not send.`,
      error
    )
    throw error
  })

  if (!eventsResponse.ok) {
    reporter.panicOnBuild(
      `Request to hubhub endpoint ${EVENTS_ENDPOINT} failed with status code ${eventsResponse.status}.`
    )
    return
  }

  /** @type {EventsPayload} */
  const eventsData = await eventsResponse.json()

  eventsData.map_data
    .filter(event => Boolean(event.hub_id))
    .forEach(event => {
      const eventNodeData = {
        title: event.event_title,
        start: new Date(event.start_date).toUTCString(),
        location: event.location_name,
        infoLink: event.registration_link || null,
      }

      const eventNodeLinks = {
        hub___NODE: createNodeId(`Hub-${event.hub_id}`),
      }

      const contentDigest = createContentDigest({
        ...eventNodeData,
        ...eventNodeLinks,
      })

      const id = createNodeId(`Event-${contentDigest}`)

      createNode({
        id,
        ...eventNodeData,
        ...eventNodeLinks,
        internal: {
          contentDigest,
          type: "Event",
        },
      })
    })

  // HUBS

  const hubsResponse = await fetch(HUBS_ENDPOINT).catch(error => {
    reporter.panicOnBuild(
      `Request to hubhub endpoint ${HUBS_ENDPOINT} could not send.`,
      error
    )
    throw error
  })

  if (!hubsResponse.ok) {
    reporter.panicOnBuild(
      `Request to hubhub endpoint ${HUBS_ENDPOINT} failed with status code ${hubsResponse.status}.`
    )
    return
  }

  /** @type {HubhubPayload} */
  const hubsData = await hubsResponse.json()

  await Promise.all(
    hubsData.map_data.map(async hub => {
      const name = parseName(hub.name)

      const hubNodeData = {
        name,
        slug: slugFromName(name),
        about: hub.about || "",
        email: hub.email,
        website: hub.website,
        facebook: hub.facebook,
        instagram: hub.instagram,
        twitter: hub.twitter,
      }

      const hubNodeLinks = {
        hero___NODE:
          !hub.hero_image || hub.hero_image.length === 0
            ? null
            : await fileNodeFromRemoteFile(helpers, hub.hero_image[0]),
        logo___NODE:
          !hub.logo_image || hub.logo_image.length === 0
            ? null
            : await fileNodeFromRemoteFile(helpers, hub.logo_image[0]),
        documents___NODE: !hub.documents
          ? []
          : await Promise.all(
              hub.documents.map(remoteFile =>
                fileNodeFromRemoteFile(helpers, remoteFile)
              )
            ),
        images___NODE: !hub.images
          ? []
          : await Promise.all(
              hub.images.map(remoteFile =>
                fileNodeFromRemoteFile(helpers, remoteFile)
              )
            ),
      }

      createNode({
        id: createNodeId(`Hub-${hub.id}`),
        ...hubNodeData,
        ...hubNodeLinks,
        internal: {
          type: "Hub",
          contentDigest: createContentDigest({
            ...hubNodeData,
            ...hubNodeLinks,
          }),
        },
      })
    })
  )
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Hub implements Node {
      id: ID!
      name: String!
      slug: String!
      about: String!
      email: String!
      website: String
      facebook: String
      instagram: String
      twitter: String
      hero: File @link(from: "hero___NODE")
      logo: File @link(from: "logo___NODE")
      documents: [File!]! @link(from: "documents___NODE")
      images: [File!]! @link(from: "images___NODE")
    }

    type Event implements Node {
      id: ID!
      title: String!
      start: String!
      location: String!
      infoLink: String
      hub: Hub! @link(from: "hub___NODE")
    }
  `
  createTypes(typeDefs)
}

/**
 * @param {import("gatsby").SourceNodesArgs} helpers
 * @param {RemoteFile} remoteFile
 * @returns {Promise<string>}
 */
const fileNodeFromRemoteFile = async (helpers, remoteFile) => {
  const fileNode = await createRemoteFileNode({
    url: remoteFile.url,
    name: remoteFile.filename,
    ...helpers,
    ...helpers.actions,
  })
  return fileNode.id
}

/**
 * @param {string} input
 * @returns {string}
 */
const parseName = input => {
  return input.replace(/sunrise(\s+movement)?/i, "").trim()
}

/**
 * @param {string} input
 * @returns {string}
 */
const slugFromName = input => {
  return input.toLowerCase().replace(/\s+/g, "-")
}
