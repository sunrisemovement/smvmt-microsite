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

const ENDPOINT = "https://sunrise-hub-json-staging.s3.amazonaws.com/hubs.json"
const HUB_ID = "recW8zsQarSo3I3Ve"

/**
 * @param {import("gatsby").SourceNodesArgs} helpers
 */
exports.sourceNodes = async helpers => {
  const { actions, createContentDigest, createNodeId, reporter } = helpers
  const { createNode } = actions

  const response = await fetch(ENDPOINT).catch(error => {
    reporter.panicOnBuild(
      `Request to hubhub endpoint ${ENDPOINT} could not send.`,
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

  const hub = data.map_data.find(hub => hub.id === HUB_ID)

  if (!hub) {
    reporter.panicOnBuild(
      `Hub ${HUB_ID} does not exist in Hubhub. Please check your config, or else contact a Hubhub admin.`
    )
  }

  const hubNodeData = {
    name: parseName(hub.name),
    about: hub.about,
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
      hero: File @link(from: "hero___NODE")
      logo: File @link(from: "logo___NODE")
      documents: [File!]! @link(from: "documents___NODE")
      images: [File!]! @link(from: "images___NODE")
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
