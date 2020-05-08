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

