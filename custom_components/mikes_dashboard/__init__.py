"""
Mike's Dashboard for Home Assistant.
"""
import os
import logging
from homeassistant.components.frontend import add_extra_js_url

_LOGGER = logging.getLogger(__name__)
VERSION = "0.1.0"
DOMAIN = "mikes_dashboard"

async def async_setup(hass, config):
    """Set up the Mike's Dashboard component."""
    # Make sure custom card resources are registered
    url = "/mikes_dashboard/mikes-dashboard.js"
    add_extra_js_url(hass, url)
    
    _LOGGER.info("Mike's Dashboard %s loaded", VERSION)
    
    return True
