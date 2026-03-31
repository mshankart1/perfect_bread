import React from 'react';

function sanitizeHex(hex) {
  if (typeof hex !== 'string') return null;
  const t = hex.trim();
  if (/^#[0-9A-Fa-f]{3}$/.test(t) || /^#[0-9A-Fa-f]{6}$/.test(t)) return t;
  return null;
}

/**
 * Portable Text annotation UI: wraps annotated text so color is visible in the editor.
 * Uses BlockAnnotationProps.renderDefault + textElement (Sanity v3 pattern).
 */
export function TextColorAnnotation(props) {
  const safe = sanitizeHex(props.value?.hex);

  return props.renderDefault({
    ...props,
    textElement: <span style={{ color: safe || 'inherit' }}>{props.textElement}</span>,
  });
}
