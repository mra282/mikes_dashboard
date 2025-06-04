import { LitElement, html, css } from 'lit-element';

class EntityCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      entityId: { type: String },
      config: { type: Object },
    };
  }

  render() {
    if (!this.hass || !this.entityId) {
      return html``;
    }

    const entity = this.hass.states[this.entityId];
    if (!entity) {
      return html`
        <div class="entity-not-found">
          Entity ${this.entityId} not found
        </div>
      `;
    }

    const domain = this.entityId.split('.')[0];
    const name = entity.attributes.friendly_name || this.entityId;
    const icon = entity.attributes.icon || this._getDefaultIcon(domain);

    // Handle different types of entities
    return html`
      <div class="entity-card" @click="${() => this._handleClick()}">
        <div class="entity-icon">
          <ha-icon icon="${icon}" style="${this._getIconStyle(domain, entity.state)}"></ha-icon>
        </div>
        <div class="entity-info">
          <div class="entity-name">${name}</div>
          <div class="entity-state">${this._formatState(domain, entity.state)}</div>
        </div>
        ${this._renderControls(domain, entity)}
      </div>
    `;
  }

  _renderControls(domain, entity) {
    // Render domain-specific controls
    switch (domain) {
      case 'light':
        return html`
          <div class="entity-control">
            <ha-icon-button 
              icon="${entity.state === 'on' ? 'mdi:lightbulb' : 'mdi:lightbulb-outline'}"
              @click="${(e) => this._toggleEntity(e)}"
            ></ha-icon-button>
          </div>
        `;
      case 'switch':
        return html`
          <div class="entity-control">
            <ha-switch 
              ?checked="${entity.state === 'on'}"
              @change="${(e) => this._toggleEntity(e)}"
            ></ha-switch>
          </div>
        `;
      case 'climate':
        return html`
          <div class="entity-control climate-control">
            <ha-icon-button icon="mdi:chevron-down" @click="${(e) => this._adjustTemperature(e, -0.5)}"></ha-icon-button>
            <span>${entity.attributes.current_temperature}°</span>
            <ha-icon-button icon="mdi:chevron-up" @click="${(e) => this._adjustTemperature(e, 0.5)}"></ha-icon-button>
          </div>
        `;
      default:
        return html``;
    }
  }

  _handleClick() {
    // Open more-info dialog
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId: this.entityId },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  _toggleEntity(e) {
    e.stopPropagation();
    const domain = this.entityId.split('.')[0];
    const service = this.hass.states[this.entityId].state === 'on' ? 'turn_off' : 'turn_on';
    this.hass.callService(domain, service, { entity_id: this.entityId });
  }

  _adjustTemperature(e, change) {
    e.stopPropagation();
    const entity = this.hass.states[this.entityId];
    const currentTemp = entity.attributes.temperature || entity.attributes.current_temperature;
    const newTemp = Math.round((currentTemp + change) * 2) / 2; // Round to nearest 0.5
    
    this.hass.callService('climate', 'set_temperature', {
      entity_id: this.entityId,
      temperature: newTemp
    });
  }

  _formatState(domain, state) {
    switch (domain) {
      case 'sensor':
        const entity = this.hass.states[this.entityId];
        return `${state} ${entity.attributes.unit_of_measurement || ''}`;
      case 'binary_sensor':
      case 'switch':
      case 'light':
        return state === 'on' ? 'On' : 'Off';
      default:
        return state;
    }
  }

  _getDefaultIcon(domain) {
    switch (domain) {
      case 'light': return 'mdi:lightbulb';
      case 'switch': return 'mdi:power-socket';
      case 'climate': return 'mdi:thermostat';
      case 'sensor': return 'mdi:gauge';
      case 'binary_sensor': return 'mdi:radiobox-marked';
      case 'media_player': return 'mdi:cast';
      case 'camera': return 'mdi:video';
      case 'cover': return 'mdi:window-shutter';
      case 'fan': return 'mdi:fan';
      default: return 'mdi:eye';
    }
  }

  _getIconStyle(domain, state) {
    if (state === 'on' && (domain === 'light' || domain === 'switch')) {
      return 'color: var(--paper-item-icon-active-color, #fdd835);';
    }
    return '';
  }

  static get styles() {
    return css`
      .entity-card {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 4px;
        background-color: var(--ha-card-background, var(--card-background-color, white));
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
      }

      .entity-card:hover {
        background-color: var(--secondary-background-color);
      }

      .entity-icon {
        margin-right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .entity-info {
        flex: 1;
        min-width: 0;
      }

      .entity-name {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .entity-state {
        font-size: 12px;
        color: var(--dashboard-secondary-text-color);
      }

      .entity-control {
        display: flex;
        align-items: center;
      }

      .entity-not-found {
        padding: 8px;
        color: var(--error-color, #db4437);
        font-size: 12px;
      }

      .climate-control {
        display: flex;
        align-items: center;
      }

      .climate-control span {
        margin: 0 4px;
      }
    `;
  }
}

customElements.define('entity-card', EntityCard);
