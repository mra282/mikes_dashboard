#!/bin/bash

# Mike's Dashboard Installer Script
# This script installs Mike's Dashboard to your Home Assistant configuration

# Configuration
HA_CONFIG_DIR="/config"  # Default Home Assistant config directory in Docker
DASHBOARD_DIR="$HA_CONFIG_DIR/www/mikes_dashboard"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running in Home Assistant environment
if [ ! -d "$HA_CONFIG_DIR" ]; then
  echo -e "${YELLOW}Warning: Home Assistant config directory not found at $HA_CONFIG_DIR${NC}"
  echo "Please enter your Home Assistant config directory path:"
  read -r HA_CONFIG_DIR
  DASHBOARD_DIR="$HA_CONFIG_DIR/www/mikes_dashboard"
fi

# Create dashboard directory
echo -e "${GREEN}Creating dashboard directory at $DASHBOARD_DIR${NC}"
mkdir -p "$DASHBOARD_DIR"

# Copy dashboard files
echo -e "${GREEN}Copying dashboard files${NC}"
cp -r dist/* "$DASHBOARD_DIR/"

# Create example configuration if it doesn't exist
CONFIG_FILE="$HA_CONFIG_DIR/mikes-dashboard.yaml"
if [ ! -f "$CONFIG_FILE" ]; then
  echo -e "${GREEN}Creating example configuration at $CONFIG_FILE${NC}"
  cp example-config.yaml "$CONFIG_FILE"
fi

echo -e "${GREEN}Installation complete!${NC}"
echo ""
echo "To use Mike's Dashboard, add the following to your Lovelace configuration:"
echo ""
echo -e "${YELLOW}resources:${NC}"
echo -e "${YELLOW}  - url: /local/mikes_dashboard/mikes-dashboard.js${NC}"
echo -e "${YELLOW}    type: module${NC}"
echo ""
echo "Then add the dashboard as a card:"
echo ""
echo -e "${YELLOW}type: custom:mikes-dashboard${NC}"
echo ""
echo -e "${GREEN}Enjoy your new dashboard!${NC}"
