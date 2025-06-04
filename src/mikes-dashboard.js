import { LitElement, html, css } from 'lit-element';

class MikesDashboard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      areas: { type: Array },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.areas = [];
  }

  firstUpdated() {
    // Placeholder for initialization
    console.log('Mike\'s Dashboard initialized');
  }

  render() {
    return html`
      <div class="dashboard">
        <h1>Mike's Dashboard</h1>
        <p>Auto-generating dashboard for Home Assistant</p>
        <p>Version 0.1.0</p>
      </div>
    `;
  }

  static get styles() {
    return css`
      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
    `;
  }

  // This is used by Lovelace card loader
  setConfig(config) {
    this.config = config;
  }

  // Card size
  getCardSize() {
    return 12;
  }
}

// Define the element
customElements.define('mikes-dashboard', MikesDashboard);

// Lovelace card registration
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'mikes-dashboard',
  name: 'Mike\'s Dashboard',
  description: 'Auto-generating dashboard for Home Assistant'
});

export default MikesDashboard;
