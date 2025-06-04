import * as YAML from 'js-yaml';

/**
 * Loads dashboard configuration from YAML file
 * @param {Object} hass - Home Assistant instance
 * @returns {Promise<Object>} - Configuration object
 */
export async function loadConfig(hass) {
  try {
    // Try to load from config file in HA config directory
    const configPath = 'mikes-dashboard.yaml';
    const response = await hass.callWS({
      type: 'file_read',
      path: configPath
    });
    
    return YAML.load(response.content);
  } catch (error) {
    console.warn('Could not load Mike\'s Dashboard config, using default settings:', error);
    
    // Return default configuration
    return {
      title: 'Home',
      theme: 'default',
      // If no configuration is found, we'll rely on auto-discovery
      autoDiscovery: true,
      // Default display settings
      display: {
        showEmptyAreas: false,
        groupSimilarEntities: true,
        maxEntitiesPerArea: 20,
        defaultCollapsed: false,
      }
    };
  }
}

/**
 * Saves dashboard configuration
 * @param {Object} hass - Home Assistant instance
 * @param {Object} config - Configuration object to save
 * @returns {Promise<boolean>} - Success status
 */
export async function saveConfig(hass, config) {
  try {
    const configPath = 'mikes-dashboard.yaml';
    const content = YAML.dump(config);
    
    await hass.callWS({
      type: 'file_write',
      path: configPath,
      content
    });
    
    return true;
  } catch (error) {
    console.error('Could not save Mike\'s Dashboard config:', error);
    return false;
  }
}
