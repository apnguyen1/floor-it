export enum ScreenType {
  Home = 'home',
  Avatar = 'avatar',
  Categories = 'categories',
  Game = 'game',
}

export const MAX_CATEGORIES = 10;

// Mock data for testing - TODO: Replace with API call
export const MOCK_CATEGORIES = [
  {
    name: 'LoL Champion Titles',
    image: 'default-preview.png',
    desc: "Guess the LoL champion's name by their title!",
  },
  {
    name: 'Pokémon Types',
    image: 'default-preview.png',
    desc: 'Match the Pokémon to their primary type!',
  },
  {
    name: 'World Capitals',
    image: 'default-preview.png',
    desc: 'Test your knowledge of world capitals',
  },
  {
    name: 'Chemical Elements',
    image: 'default-preview.png',
    desc: 'Match elements to their symbols',
  },
  {
    name: 'Famous Paintings',
    image: 'default-preview.png',
    desc: 'Identify these masterpieces',
  },
  {
    name: 'Movie Quotes',
    image: 'default-preview.png',
    desc: 'Name the movie from famous quotes',
  },
  {
    name: 'Historical Figures',
    image: 'default-preview.png',
    desc: 'Match historical figures to their achievements',
  },
  {
    name: 'Programming Languages',
    image: 'default-preview.png',
    desc: 'Match languages to their use cases',
  },
  {
    name: 'Car Brands',
    image: 'default-preview.png',
    desc: 'Identify car manufacturers by their logos',
  },
  {
    name: 'Space Exploration',
    image: 'default-preview.png',
    desc: 'Test your knowledge of space missions',
  },
  {
    name: 'Ancient Civilizations',
    image: 'default-preview.png',
    desc: 'Match civilizations to their artifacts',
  },
  {
    name: 'Musical Instruments',
    image: 'default-preview.png',
    desc: 'Identify instruments by their sound',
  },
  {
    name: 'Famous Scientists',
    image: 'default-preview.png',
    desc: 'Match scientists to their discoveries',
  },
  {
    name: 'World Cuisines',
    image: 'default-preview.png',
    desc: 'Identify dishes from around the world',
  },
  {
    name: 'Sports Legends',
    image: 'default-preview.png',
    desc: 'Match athletes to their sports',
  },
  {
    name: 'Literature Classics',
    image: 'default-preview.png',
    desc: 'Match books to their authors',
  },
  {
    name: 'Animal Kingdom',
    image: 'default-preview.png',
    desc: 'Identify animals by their traits',
  },
  {
    name: 'Famous Landmarks',
    image: 'default-preview.png',
    desc: 'Name these world-famous locations',
  },
  {
    name: 'Tech Companies',
    image: 'default-preview.png',
    desc: 'Match companies to their products',
  },
  {
    name: 'Ancient Mythology',
    image: 'default-preview.png',
    desc: 'Match gods to their domains',
  },
  {
    name: 'Famous Battles',
    image: 'default-preview.png',
    desc: 'Test your knowledge of historical battles',
  },
  {
    name: 'Ocean Life',
    image: 'default-preview.png',
    desc: 'Identify marine creatures',
  },
  {
    name: 'Famous Inventions',
    image: 'default-preview.png',
    desc: 'Match inventions to their creators',
  },
  {
    name: 'World Languages',
    image: 'default-preview.png',
    desc: 'Match languages to their regions',
  },
  {
    name: 'Classic Art Styles',
    image: 'default-preview.png',
    desc: 'Identify different art movements',
  },
  {
    name: 'Human Anatomy',
    image: 'default-preview.png',
    desc: 'Match body parts to their functions',
  },
  {
    name: 'Weather Phenomena',
    image: 'default-preview.png',
    desc: 'Identify different weather events',
  },
  {
    name: 'Famous Architects',
    image: 'default-preview.png',
    desc: 'Match architects to their buildings',
  },
  {
    name: 'Plant Species',
    image: 'default-preview.png',
    desc: 'Identify different types of plants',
  },
  {
    name: 'Medieval Times',
    image: 'default-preview.png',
    desc: 'Test your knowledge of medieval history',
  },
  {
    name: 'Olympic Games',
    image: 'default-preview.png',
    desc: 'Match events to their categories',
  },
  {
    name: 'Dinosaur Species',
    image: 'default-preview.png',
    desc: 'Identify different dinosaurs',
  },
] as const;
