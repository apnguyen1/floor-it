import { CategoryContent, CategoryList } from '../types/category.type.ts';
import { BASE_URL } from '../constants/config';

// Internal helper function for fetching JSON data
async function fetchJson<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.json();
  } catch (error) {
    console.log(`Probably a CORS error: ${error}`);

    if (process.env.NODE_ENV !== 'dev') {
      const file = await fetch(endpoint);
      return file.json();
    }
    throw error;
  }
}

// Exported functions for specific data fetching
export const fetchCategories = () =>
  fetchJson<CategoryList>('category_preview_list.json').then(
    (data) => data.category_previews,
  );

export const fetchCategoryData = (categoryId: string) =>
  fetchJson<CategoryContent>(`category_data/${categoryId}`);
