import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import type { CategoryData } from '../utils/fetch.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function printChampionTitles() {
  try {
    const filePath = join(
      __dirname,
      '../../public/category_data/lol_champion_titles.json',
    );
    const fileContent = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent) as CategoryData;

    console.log('=== LoL Champion Titles ===');
    console.log(`Name: ${data.name}`);
    console.log(`Description: ${data.preview_desc}`);
    console.log(`Total Champions: ${data.questions.length}`);
    console.log('\nChampion Titles:');

    data.questions.forEach((q, index) => {
      console.log(`${index + 1}. "${q.question}" -> ${q.answers[0]}`);
    });
  } catch (error) {
    console.error('Failed to load champion titles:', error);
  }
}

// Run the script
printChampionTitles();
