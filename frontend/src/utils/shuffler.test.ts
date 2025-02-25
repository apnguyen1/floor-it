import { describe, expect, it } from 'vitest';
import { shuffleArray } from './shuffler.ts';

describe('shuffleArray', () => {
  it('should return a new array and not modify the original', () => {
    const original = [1, 2, 3, 4, 5];
    const originalCopy = [...original];

    const shuffled = shuffleArray(original);

    // Original should be unchanged
    expect(original).toEqual(originalCopy);
    // Result should be a different array instance
    expect(shuffled).not.toBe(original);
  });

  it('should return an array of the same length', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);

    expect(shuffled.length).toBe(original.length);
  });

  it('should contain all the same elements as the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);

    // Check that both arrays have the same elements, regardless of order
    expect(shuffled.sort()).toEqual(original.sort());
  });

  it(`It should shuffle the array`, () => {
    const original = [1, 2, 3, 4, 5];

    const arrangements = new Set<string>();

    for (let i = 0; i < 100; i++) {
      const shuffled = shuffleArray(original);
      arrangements.add(JSON.stringify(shuffled));
    }

    expect(arrangements.size).toBeGreaterThan(1);
  });

  it('should handle empty arrays', () => {
    const empty: number[] = [];
    const result = shuffleArray(empty);

    expect(result).toEqual([]);
    expect(result).not.toBe(empty);
  });

  it('should handle arrays with a single element', () => {
    const single = [42];
    const result = shuffleArray(single);

    expect(result).toEqual([42]);
    expect(result).not.toBe(single);
  });

  it('should handle arrays with duplicate values', () => {
    const withDuplicates = [1, 2, 2, 3, 3, 3];
    const result = shuffleArray(withDuplicates);

    expect(result.sort()).toEqual(withDuplicates.sort());
  });

  it('should work with arrays of different types', () => {
    const stringArray = ['a', 'b', 'c', 'd'];
    const objectArray = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const shuffledStrings = shuffleArray(stringArray);
    const shuffledObjects = shuffleArray(objectArray);

    expect(shuffledStrings.length).toBe(stringArray.length);
    expect(shuffledStrings.sort()).toEqual(stringArray.sort());

    const sortById = (a: { id: number }, b: { id: number }) => a.id - b.id;
    expect(shuffledObjects.sort(sortById)).toEqual(objectArray.sort(sortById));
  });
});
