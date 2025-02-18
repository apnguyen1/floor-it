import { Command } from '../types/command.ts';

export const BASE_URL = import.meta.env.BASE_URL;

export const createCommand = (overrides: Partial<Command> = {}): Command => ({
  command: '',
  callback: () => {},
  isFuzzyMatch: true,
  matchInterim: true,
  fuzzyMatchingThreshold: 0.4,
  bestMatchOnly: true,
  ...overrides,
});
