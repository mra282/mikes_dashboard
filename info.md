# Mike's Dashboard

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]][license]

An auto-generating dashboard for Home Assistant inspired by Dwains Dashboard. This project creates a custom Lovelace dashboard that automatically discovers and organizes your Home Assistant entities by rooms/areas.

> **Note:** This project was created with the assistance of AI tools to help streamline development.

## Features

- 🏠 Auto-discovery of Home Assistant entities
- 🏠 Organization by rooms/areas
- 🏠 Responsive design that works on desktop and mobile
- 🏠 Customizable layout and themes
- 🏠 Easy configuration with minimal setup

## Installation

1. Add the following to your `ui-lovelace.yaml` file:

```yaml
resources:
  - url: /hacsfiles/mikes_dashboard/dist/mikes-dashboard.js
    type: module
```

2. Create a `mikes-dashboard.yaml` file in your Home Assistant configuration directory or let the dashboard auto-discover your entities.

## Usage

Add the dashboard as a card in your Lovelace UI:

```yaml
type: custom:mikes-dashboard
```

[releases]: https://github.com/mra282/mikes_dashboard/releases
[releases-shield]: https://img.shields.io/github/release/mra282/mikes_dashboard.svg?style=for-the-badge
[license]: https://github.com/mra282/mikes_dashboard/blob/main/LICENSE
[license-shield]: https://img.shields.io/github/license/mra282/mikes_dashboard.svg?style=for-the-badge
