import { describe, expect, it } from 'vitest';
import { getAvatarInitials } from './avatarInitials.ts';

describe('getAvatarLetter', () => {
  it('should return initials for full names', () => {
    expect(getAvatarInitials('John Doe', 'N/A')).toBe('JD');
    expect(getAvatarInitials('Jane Marie Smith', 'N/A')).toBe('JMS');
  });

  it('should return first letter for single names', () => {
    expect(getAvatarInitials('Alice', 'N/A')).toBe('A');
    expect(getAvatarInitials('Bob', 'Guest')).toBe('B');
  });

  it('should return default value for empty or whitespace inputs', () => {
    expect(getAvatarInitials('', 'Guest')).toBe('Guest');
    expect(getAvatarInitials('   ', 'Default')).toBe('Default');
  });

  it('should handle names with extra whitespace', () => {
    expect(getAvatarInitials('  John   Doe  ', 'N/A')).toBe('JD');
    expect(getAvatarInitials('  Alice  ', 'N/A')).toBe('A');
  });
});
