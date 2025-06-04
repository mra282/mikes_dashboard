<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Mike's Dashboard

This project is a custom Home Assistant dashboard inspired by Dwains Dashboard. It automatically generates a dashboard layout based on Home Assistant entities and areas.

## Key Components

1. Dashboard Core (`src/mikes-dashboard.js`): Main entry point for the dashboard
2. Auto Discovery (`src/utils/auto-discovery.js`): Logic to discover and categorize Home Assistant entities
3. UI Components (`src/components/`): Custom cards and UI elements for the dashboard
4. Configuration Management (`src/utils/config.js`): Handles loading and parsing configuration from YAML
5. Theming (`src/style/`): CSS and theme variables for the dashboard

## Technologies Used

- LitElement for web components
- Home Assistant JS Websocket for connecting to Home Assistant API
- YAML for configuration
- Rollup for bundling
