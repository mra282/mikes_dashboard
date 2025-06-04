/* Dashboard style variables */
:root {
  --dashboard-primary-color: var(--primary-color, #03a9f4);
  --dashboard-secondary-color: var(--accent-color, #ff9800);
  --dashboard-text-color: var(--primary-text-color, #212121);
  --dashboard-secondary-text-color: var(--secondary-text-color, #727272);
  --dashboard-background: var(--card-background-color, #ffffff);
  --dashboard-divider-color: var(--divider-color, #eaeaea);
  --dashboard-card-radius: var(--ha-card-border-radius, 4px);
  --dashboard-box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2));
}

/* Dark theme overrides */
:host(.theme-dark) {
  --dashboard-background: var(--card-background-color, #1c1c1c);
  --dashboard-text-color: var(--primary-text-color, #ffffff);
  --dashboard-secondary-text-color: var(--secondary-text-color, #a0a0a0);
  --dashboard-divider-color: var(--divider-color, #383838);
}

/* Responsive adjustments */
@media screen and (max-width: 600px) {
  .dashboard-content {
    padding: 8px;
  }
  
  .dashboard-header {
    padding: 12px 16px;
  }
  
  .dashboard-header h1 {
    font-size: 20px;
  }
}
