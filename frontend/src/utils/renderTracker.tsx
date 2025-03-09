// src/utils/simpleRenderTracker.ts

/**
 * A simple tracker to log when components render
 *
 * Usage:
 * 1. Import in your component
 * 2. Add at the top of your component function:
 *    useRenderTracker('ComponentName');
 */

import React, { useEffect, useRef } from 'react';

// Component render counts
const renderCounts: Record<string, number> = {};

/**
 * Hook to track how many times a component renders
 * @param componentName Name of the component to track
 */
export const useRenderTracker = (componentName: string): void => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    renderCounts[componentName] = (renderCounts[componentName] || 0) + 1;

    console.log(`[Render] ${componentName} rendered ${renderCount.current} times`);

    // Log all component render counts every 10 renders
    if (renderCount.current % 10 === 0) {
      console.log('[Render Counts]', renderCounts);
    }
  });
};

/**
 * Higher-order component to track renders
 * @param Component Component to track
 * @param componentName Name to display in logs
 */
export function withRenderTracker<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
): React.FC<P> {
  const TrackedComponent: React.FC<P> = (props) => {
    useRenderTracker(componentName);
    return <Component {...props} />;
  };

  TrackedComponent.displayName = `RenderTracker(${componentName})`;
  return TrackedComponent;
}

/**
 * Reset all render counters
 */
export const resetRenderCounters = (): void => {
  Object.keys(renderCounts).forEach((key) => {
    renderCounts[key] = 0;
  });
  console.log('[Render] Counters reset');
};
