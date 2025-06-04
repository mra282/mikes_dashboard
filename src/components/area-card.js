import { LitElement, html, css } from 'lit-element';

class AreaCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      area: { type: Object },
      config: { type: Object },
      expanded: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.expanded = false;
  }

  render() {
    const { name, icon, entities } = this.area;

    return html`
      <ha-card class="area-card">
        <div class="area-header" @click="${this._toggleExpand}">
          <ha-icon icon="${icon || 'mdi:home'}"></ha-icon>
          <h2>${name}</h2>
          <ha-icon class="expand-icon" icon="${this.expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
        </div>
        ${this.expanded ? html`
          <div class="area-content">
            <div class="entity-grid">
              ${entities.map(entityId => this._renderEntity(entityId))}
            </div>
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  _renderEntity(entityId) {
    const entity = this.hass.states[entityId];
    if (!entity) return html``;

    return html`
      <entity-card 
        .hass="${this.hass}"
        .entityId="${entityId}"
        .config="${this.config}"
      ></entity-card>
    `;
  }

  _toggleExpand() {
    this.expanded = !this.expanded;
  }

  static get styles() {
    return css`
      .area-card {
        width: 100%;
        transition: all 0.3s ease-in-out;
      }

      .area-header {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        background-color: var(--dashboard-primary-color);
        color: white;
        border-radius: var(--ha-card-border-radius, 4px);
      }

      .area-header h2 {
        margin: 0 0 0 8px;
        flex: 1;
        font-size: 18px;
        font-weight: 400;
      }

      .expand-icon {
        transition: transform 0.3s ease;
      }

      .area-content {
        padding: 16px;
      }

      .entity-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-gap: 8px;
      }

      @media (max-width: 600px) {
        .entity-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `;
  }
}

customElements.define('area-card', AreaCard);
