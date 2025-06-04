import { LitElement, html, css } from 'lit-element';

class DashboardLayout extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
    };
  }

  render() {
    return html`
      <div class="dashboard-layout">
        <div class="dashboard-header">
          <h1>${this.config.title || 'Home Dashboard'}</h1>
          <div class="dashboard-actions">
            <ha-icon-button icon="mdi:cog" @click="${this._openSettings}"></ha-icon-button>
            <ha-icon-button icon="mdi:refresh" @click="${this._refresh}"></ha-icon-button>
          </div>
        </div>
        <div class="dashboard-content">
          <slot></slot>
        </div>
        <div class="dashboard-footer">
          <p>Mike's Dashboard v0.1.0</p>
        </div>
      </div>
    `;
  }

  _openSettings() {
    // Open settings dialog
    const event = new CustomEvent('dashboard-settings', {
      detail: { config: this.config },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  _refresh() {
    // Refresh the dashboard
    const event = new CustomEvent('dashboard-refresh', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --dashboard-primary-color: var(--primary-color, #03a9f4);
        --dashboard-text-color: var(--primary-text-color, #212121);
        --dashboard-secondary-text-color: var(--secondary-text-color, #727272);
        --dashboard-background: var(--card-background-color, #ffffff);
        --dashboard-divider-color: var(--divider-color, #eaeaea);
      }

      .dashboard-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: var(--dashboard-background);
        color: var(--dashboard-text-color);
      }

      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-bottom: 1px solid var(--dashboard-divider-color);
      }

      .dashboard-header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 400;
      }

      .dashboard-actions {
        display: flex;
      }

      .dashboard-content {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 16px;
      }

      .dashboard-footer {
        padding: 8px 16px;
        text-align: center;
        font-size: 12px;
        color: var(--dashboard-secondary-text-color);
        border-top: 1px solid var(--dashboard-divider-color);
      }

      @media (max-width: 600px) {
        .dashboard-content {
          grid-template-columns: 1fr;
        }
      }
    `;
  }
}

customElements.define('dashboard-layout', DashboardLayout);
