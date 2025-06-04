/**
 * Auto-discovers Home Assistant entities and organizes them by area
 * @param {Object} hass - Home Assistant instance
 * @param {Object} config - Dashboard configuration
 * @returns {Promise<Array>} - Array of area objects with entities
 */
export async function discoverEntities(hass, config) {
  try {
    // Get all areas from Home Assistant
    const areas = await hass.callWS({ type: 'config/area_registry/list' });
    
    // Get all devices
    const devices = await hass.callWS({ type: 'config/device_registry/list' });
    
    // Get all entities
    const entities = await hass.callWS({ type: 'config/entity_registry/list' });
    
    // Map areas with their devices and entities
    const areaMap = areas.map(area => {
      // Find devices in this area
      const areaDevices = devices.filter(device => device.area_id === area.area_id);
      
      // Find entities belonging to these devices
      let areaEntities = [];
      
      // Add device entities
      areaDevices.forEach(device => {
        const deviceEntities = entities
          .filter(entity => entity.device_id === device.id)
          .map(entity => entity.entity_id);
        
        areaEntities = [...areaEntities, ...deviceEntities];
      });
      
      // Add entities directly assigned to area
      const directEntities = entities
        .filter(entity => entity.area_id === area.area_id)
        .map(entity => entity.entity_id);
      
      areaEntities = [...areaEntities, ...directEntities];
      
      // Remove duplicates
      areaEntities = [...new Set(areaEntities)];
      
      // Get icon for this area
      let icon = 'mdi:home';
      
      // Try to find an appropriate icon based on area name
      const areaNameLower = area.name.toLowerCase();
      if (areaNameLower.includes('living')) icon = 'mdi:sofa';
      else if (areaNameLower.includes('kitchen')) icon = 'mdi:stove';
      else if (areaNameLower.includes('bed')) icon = 'mdi:bed';
      else if (areaNameLower.includes('bath')) icon = 'mdi:bathtub';
      else if (areaNameLower.includes('office')) icon = 'mdi:desk';
      else if (areaNameLower.includes('garage')) icon = 'mdi:garage';
      else if (areaNameLower.includes('garden') || areaNameLower.includes('yard')) icon = 'mdi:tree';
      
      return {
        id: area.area_id,
        name: area.name,
        icon,
        entities: areaEntities
      };
    });
    
    // Filter out areas with no entities if configured to do so
    const filteredAreas = config.display?.showEmptyAreas === false
      ? areaMap.filter(area => area.entities.length > 0)
      : areaMap;
    
    // Sort areas by name
    return filteredAreas.sort((a, b) => a.name.localeCompare(b.name));
    
  } catch (error) {
    console.error('Error auto-discovering entities:', error);
    return [];
  }
}

/**
 * Groups similar entities together (e.g., multiple lights in one control)
 * @param {Object} hass - Home Assistant instance
 * @param {Array} entities - List of entity IDs
 * @returns {Array} - Grouped entities
 */
export function groupSimilarEntities(hass, entities) {
  const groups = {};
  
  entities.forEach(entityId => {
    const domain = entityId.split('.')[0];
    if (!groups[domain]) {
      groups[domain] = [];
    }
    groups[domain].push(entityId);
  });
  
  return Object.entries(groups).map(([domain, entityIds]) => {
    return {
      domain,
      entities: entityIds,
      count: entityIds.length
    };
  });
}
