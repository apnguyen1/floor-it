// Types for category data
export interface Category {
  name: string;
  image: string;
  desc: string;
}

export interface CategoryList {
  categories: Category[];
}

/**
 * Fetches and parses category data from a JSON file
 * @param url The URL or path to the JSON file
 * @returns Promise containing the parsed category list
 * @throws Error if the fetch fails or if the data is invalid
 */
export async function fetchCategories(url: string): Promise<Category[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as CategoryList;

    // Validate the data structure
    if (!data.categories || !Array.isArray(data.categories)) {
      throw new Error('Invalid categories data format');
    }

    // Validate each object has required fields
    data.categories.forEach((category, index) => {
      if (!category.name || !category.image || !category.desc) {
        throw new Error(`Invalid category at index ${index}`);
      }
    });

    return data.categories;
  } catch (error) {
    throw new Error(
      `Failed to fetch categories: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Generic fetch function for any JSON data
 * @param url The URL or path to the JSON file
 * @returns Promise containing the parsed JSON data
 * @throws Error if the fetch fails
 */
export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Types for question data
export interface Question {
  question: string;
  answers: string[];
  aliases: string[];
}

export interface CategoryData {
  name: string;
  preview_img: string;
  preview_desc: string;
  type: 'text' | 'img';
  questions: Question[];
}

/**
 * Fetches and parses category question data from a JSON file
 * @param url The URL or path to the JSON file
 * @returns Promise containing the parsed CategoryData
 * @throws Error if the fetch fails or if the data is invalid
 */
export async function fetchCategoryData(url: string): Promise<CategoryData> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as CategoryData;

    // Validate the data structure
    if (
      !data.name ||
      !data.preview_img ||
      !data.preview_desc ||
      !data.type ||
      !data.questions
    ) {
      throw new Error('Invalid category data format: missing required fields');
    }

    if (data.type !== 'text' && data.type !== 'img') {
      throw new Error(`Invalid question type: ${data.type}`);
    }

    if (!Array.isArray(data.questions)) {
      throw new Error('Invalid questions format: expected array');
    }

    // Validate each question object has required fields
    data.questions.forEach((question, index) => {
      if (
        !question.question ||
        !Array.isArray(question.answers) ||
        !Array.isArray(question.aliases)
      ) {
        throw new Error(`Invalid question at index ${index}`);
      }

      if (question.answers.length === 0) {
        throw new Error(`Question at index ${index} has no answers`);
      }
    });

    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch category data: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
