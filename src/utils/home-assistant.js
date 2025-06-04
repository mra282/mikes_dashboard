import { createConnection, subscribeEntities } from 'home-assistant-js-websocket';

/**
 * Connect to Home Assistant websocket API
 * @param {string} url - Home Assistant URL
 * @param {string} token - Long-lived access token
 * @returns {Promise<Object>} - Home Assistant connection
 */
export async function connectToHomeAssistant(url, token) {
  // Create authentication for Home Assistant
  const auth = {
    type: 'auth',
    access_token: token
  };

  try {
    // Create WebSocket connection
    const connection = await createConnection({ auth });
    console.log('Connected to Home Assistant');
    return connection;
  } catch (error) {
    console.error('Error connecting to Home Assistant:', error);
    throw error;
  }
}

/**
 * Subscribe to entity updates
 * @param {Object} connection - Home Assistant connection
 * @param {Function} callback - Callback function when entities update
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToEntities(connection, callback) {
  return subscribeEntities(connection, (entities) => {
    callback(entities);
  });
}

/**
 * Helper function to call a Home Assistant service
 * @param {Object} hass - Home Assistant instance
 * @param {string} domain - Service domain
 * @param {string} service - Service name
 * @param {Object} serviceData - Service data
 * @returns {Promise<Object>} - Service call result
 */
export async function callService(hass, domain, service, serviceData) {
  try {
    return await hass.callService(domain, service, serviceData);
  } catch (error) {
    console.error(`Error calling service ${domain}.${service}:`, error);
    throw error;
  }
}
