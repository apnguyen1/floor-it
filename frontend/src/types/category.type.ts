export type CategoryPreview = {
  name: string;
  image: string;
  desc: string;
};

export type CategoryList = {
  category_previews: CategoryPreview[];
};

export type Question = {
  question: string;
  answers: string[];
  aliases: string[];
};

export type CategoryContent = {
  name: string;
  preview_img: string;
  preview_desc: string;
  type: 'text' | 'img';
  questions: Question[];
};
