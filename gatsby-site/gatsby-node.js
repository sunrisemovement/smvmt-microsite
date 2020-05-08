const fetch = require("node-fetch").default
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
 * @property {Array<RemoteFile> | null} documents
 * @property {Array<RemoteFile> | null} images
 */

/**
 * @typedef {Object} HubhubPayload
 * @property {string} updated_at
 * @property {Array<Hub>} map_data
 */

const ENDPOINT = "https://sunrise-hub-json-staging.s3.amazonaws.com/hubs.json"
const HUB_NAME = "Sunrise Foof"

/**
 * @param {import("gatsby").SourceNodesArgs} pluginArgs
 */
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  reporter,
  cache,
  store,
}) => {
  const { createNode } = actions

  const response = await fetch(ENDPOINT).catch(error => {
    reporter.panicOnBuild(
      `Request to hubhubh endpoint ${ENDPOINT} could not send.`,
      error
    )
    throw error
  })

  if (!response.ok) {
    reporter.panicOnBuild(
      `Request to hubhub endpoint ${ENDPOINT} failed with status code ${response.status}.`
    )
    return
  }

  /** @type {HubhubPayload} */
  const data = await response.json()

  const hub = data.map_data.find(hub => hub.name === HUB_NAME)

  if (!hub) {
    reporter.panicOnBuild(
      `Hub "${HUB_NAME}" does not exist in Hubhub. Please check your config, or else contact a Hubhub admin.`
    )
  }

  const hubNodeData = {
    name: hub.name,
    about: hub.about,
    email: hub.email,
    website: hub.website,
    facebook: hub.facebook,
    instagram: hub.instagram,
    twitter: hub.twitter,
  }

  const hubNodeLinks = {
    documents___NODE: !hub.documents
      ? []
      : await Promise.all(
          hub.documents.map(async remoteFile => {
            const fileNode = await createRemoteFileNode({
              url: remoteFile.url,
              name: remoteFile.filename,
              cache: cache,
              createNode: createNode,
              createNodeId: createNodeId,
              reporter: reporter,
              store: store,
            })
            return fileNode.id
          })
        ),
    images___NODE: await Promise.all(
      hub.images.map(async remoteFile => {
        const fileNode = await createRemoteFileNode({
          url: remoteFile.url,
          name: remoteFile.filename,
          cache: cache,
          createNode: createNode,
          createNodeId: createNodeId,
          reporter: reporter,
          store: store,
        })
        return fileNode.id
      })
    ),
  }

  createNode({
    id: createNodeId(`Hub-${hub.name}`),
    ...hubNodeData,
    ...hubNodeLinks,
    internal: {
      type: "Hub",
      contentDigest: createContentDigest(hubNodeData),
    },
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Hub implements Node {
      id: ID!
      name: String!
      about: String!
      email: String!
      website: String
      facebook: String
      instagram: String
      twitter: String
      documents: [File!]! @link(from: "documents___NODE")
      images: [File!]! @link(from: "images___NODE")
    }
  `
  createTypes(typeDefs)
}
