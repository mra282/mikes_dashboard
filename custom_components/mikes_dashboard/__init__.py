"""
Mike's Dashboard for Home Assistant.
"""
import os
import logging
from pathlib import Path
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.typing import ConfigType

from .const import VERSION, DOMAIN, URL_BASE

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Mike's Dashboard component."""
    # Register the www directory
    root_dir = Path(__file__).parent
    hass.http.register_static_path(
        f"/{DOMAIN}",
        str(root_dir / "www"),
        cache_headers=False
    )
    
    # Register the JS file
    add_extra_js_url(hass, f"/{DOMAIN}/mikes-dashboard.js")
    
    _LOGGER.info("Mike's Dashboard %s loaded", VERSION)
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry."""
    hass.data.setdefault(DOMAIN, {})
    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    return True
