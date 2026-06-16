transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: var(--accent-amber);
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

/* ==========================================================================
   BUTTON SYSTEM (MODAL ACTIONS)
   ========================================================================== */

.btn {
  border: none;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 4px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  transition: transform 0.15s ease, background-color 0.2s ease, opacity 0.2s ease;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background-color: var(--accent-amber);
  color: #1A1D20;
}

.btn-primary:hover {
  background-color: #ffbe2e;
}

.btn-secondary {
  background-color: var(--container-wall);
  color: var(--text-default);
}

.btn-secondary:hover {
  background-color: #3a3f46;
}

/* ==========================================================================
   VALIDATION FEEDBACK SYSTEM
   ========================================================================== */

.validation-feedback-node {
  font-size: 12px;
  min-height: 16px;
  color: var(--text-secondary);
}

.validation-feedback-node.error {
  color: var(--color-error);
  font-weight: 600;
}

.validation-feedback-node.success {
  color: var(--color-success);
  font-weight: 600;
}

/* ==========================================================================
   ACCESSIBILITY & FOCUS MANAGEMENT
   ========================================================================== */

button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--accent-amber);
  outline-offset: 3px;
}

/* ==========================================================================
   SMALL DEVICE OPTIMIZATIONS
   ========================================================================== */

@media (max-width: 600px) {
  .mantel-shelf {
    justify-content: center;
    gap: var(--spacing-inner);
  }

  .door-container {
    flex-direction: column;
    align-items: center;
  }

  .coffee-table {
    flex-direction: column;
    height: auto;
    padding: var(--spacing-card);
  }

  .game-portal {
    height: 100px;
  }

  .modal-card {
    padding: var(--spacing-card);
  }
}

/* ==========================================================================
   FINAL SAFETY NET (ENSURE NO OVERFLOW)
   ========================================================================== */

img {
  max-width: 100%;
  display: block;
}
