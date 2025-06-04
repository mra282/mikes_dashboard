# Mike's Dashboard

An auto-generating dashboard for Home Assistant inspired by Dwains Dashboard. This project creates a custom Lovelace dashboard that automatically discovers and organizes your Home Assistant entities by rooms/areas.

## Features

- 🏠 Auto-discovery of Home Assistant entities
- 🏠 Organization by rooms/areas
- 🏠 Responsive design that works on desktop and mobile
- 🏠 Customizable layout and themes
- 🏠 Easy configuration with minimal setup

## Installation

### HACS Installation (Recommended)

1. Make sure you have [HACS](https://hacs.xyz/) installed
2. Add this repository as a custom repository in HACS
   - Go to HACS → Integrations → ⋮ → Custom repositories
   - Enter the URL: https://github.com/your-username/mikes_dashboard
   - Category: Lovelace
3. Click "Install" next to "Mike's Dashboard" in the HACS store
4. Add the following to your `ui-lovelace.yaml` file:

```yaml
resources:
  - url: /hacsfiles/mikes_dashboard/mikes-dashboard.js
    type: module
```

### Manual Installation

1. Download the `mikes-dashboard.js` file from the `dist` directory in this repository
2. Copy the file to your `www` directory in Home Assistant
3. Add the following to your `ui-lovelace.yaml` file:

```yaml
resources:
  - url: /local/mikes-dashboard.js
    type: module
```

## Configuration

Create a `mikes-dashboard.yaml` file in your Home Assistant configuration directory with the following structure:

```yaml
# Example configuration
dashboard:
  title: My Home
  theme: default
  areas:
    - name: Living Room
      icon: mdi:sofa
      entities:
        - light.living_room
        - media_player.living_room_tv
    # Add more areas as needed
```

Alternatively, you can let Mike's Dashboard auto-discover your entities based on your Home Assistant area setup.

## Development

### Setup Development Environment

```bash
git clone https://github.com/your-username/mikes_dashboard.git
cd mikes_dashboard
npm install
```

### Build the Project

```bash
npm run build
```

### Watch for Changes

```bash
npm run watch
```

## License

MIT
