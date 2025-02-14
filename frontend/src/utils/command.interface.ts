export interface Command {
  command: string | string[] | RegExp;
  callback: (...args: string[]) => void;
  isFuzzyMatch?: boolean | undefined;
  matchInterim?: boolean | undefined;
  fuzzyMatchingThreshold?: number | undefined;
  bestMatchOnly?: boolean | undefined;
}
