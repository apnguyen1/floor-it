export interface CategoryPreview {
  name: string;
  image: string;
  desc: string;
}

export interface CategoryList {
  category_previews: CategoryPreview[];
}

export interface Question {
  question: string;
  answers: string[];
  aliases: string[];
}

export interface CategoryContent {
  name: string;
  preview_img: string;
  preview_desc: string;
  type: 'text' | 'img';
  questions: Question[];
}
