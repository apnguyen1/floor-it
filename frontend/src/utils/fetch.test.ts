import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CategoryContent,
  CategoryList,
  CategoryPreview,
  Question,
} from '../types/category.interface.ts';
import { fetchCategories, fetchCategoryData } from './fetch.ts';

const mockCategoryList: CategoryList = {
  category_previews: [
    {
      name: 'LoL Champion Titles',
      image: 'default-preview.png',
      desc: "Guess the LoL champion's name by their title!",
    },
  ],
};

const mockCategoryData: CategoryContent = {
  name: 'LoL Champion Titles',
  preview_img: 'default-preview.png',
  preview_desc: "Guess the LoL champion's name by their title!",
  type: 'text',
  questions: [
    {
      question: 'the Darkin Blade',
      answers: ['Aatrox'],
      aliases: [],
    },
    {
      question: 'the Aspect of Twilight',
      answers: ['Zoe'],
      aliases: [],
    },
    {
      question: 'Rise of the Thorns',
      answers: ['Zyra'],
      aliases: [],
    },
  ],
};

describe('fetchCategories', () => {
  let result: CategoryPreview[];

  beforeEach(async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategoryList),
      } as Response),
    );

    result = await fetchCategories();
  });

  it('asserts is of categoryPreview', async () => {
    expect(result as CategoryPreview[]).toBeDefined();
  });

  it('asserts data is correct', async () => {
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          image: expect.any(String),
          desc: expect.any(String),
        }),
      ]),
    );
  });

  it('asserts http failure', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve(mockCategoryList),
      } as Response),
    );

    await expect(fetchCategories()).rejects.toThrow(expect.any(Error));
  });
});

describe('fetchCategoryData', () => {
  let result: CategoryContent;

  beforeEach(async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategoryData),
      } as Response),
    );

    result = await fetchCategoryData('example.json');
  });

  it('asserts is of categoryData', async () => {
    expect(result as CategoryContent).toBeDefined();
  });

  it('asserts data has correct structure', async () => {
    expect(result).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        preview_img: expect.any(String),
        preview_desc: expect.any(String),
        type: expect.stringMatching(/text|img/),
        questions: expect.arrayContaining([
          expect.objectContaining({
            question: expect.any(String),
            answers: expect.arrayContaining([expect.any(String)]),
            aliases: expect.any(Array),
          }) as Question,
        ]),
      }),
    );
  });

  it('asserts http failure', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve(mockCategoryData),
      } as Response),
    );

    await expect(fetchCategories()).rejects.toThrow(expect.any(Error));
  });
});
