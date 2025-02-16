import { CategoryContent, CategoryList } from '../types/category.type.ts';
import { BASE_URL } from '../constants/config';

// Internal helper function for fetching JSON data
async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

// Exported functions for specific data fetching
export const fetchCategories = () =>
  fetchJson<CategoryList>('category_preview_list.json').then(
    (data) => data.category_previews,
  );

export const fetchCategoryData = (categoryId: string) =>
  fetchJson<CategoryContent>(`category_data/${categoryId}`);
