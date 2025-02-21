export type CategoryPreview = {
  name: string;
  image: string;
  desc: string;
};

export type CategoryList = {
  category_previews: CategoryPreview[];
};
