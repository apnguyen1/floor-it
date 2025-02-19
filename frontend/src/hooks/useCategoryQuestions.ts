import { useEffect, useRef, useState } from 'react';
import { CategoryContent, Question } from '../types/category.type.ts';
import { shuffleArray } from '../utils/shuffler.ts';
import { fetchCategoryData } from '../utils/fetch.ts';

export const useCategoryQuestions = (selectedCategory: string[]) => {
  const [category, setCategory] = useState<CategoryContent | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(
    undefined,
  );
  const questions = useRef<Question[]>([]);
  const questionIndex = useRef(0);

  useEffect(() => {
    if (!selectedCategory.length) return;
    const categoryFile =
      shuffleArray(selectedCategory)[0].toLowerCase().replace(/\s/g, '_') + '.json';

    fetchCategoryData(categoryFile)
      .then((data) => {
        setCategory(data);
        questions.current = shuffleArray(data.questions);
        setCurrentQuestion(questions.current[0]);
      })
      .catch((e) => console.error('Failed to fetch category:', e));
  }, [selectedCategory]);

  const skipQuestion = () => {
    questionIndex.current = (questionIndex.current + 1) % questions.current.length;
    setCurrentQuestion(questions.current[questionIndex.current]);
  };

  const setNextQuestion = () => {
    questionIndex.current = (questionIndex.current + 1) % questions.current.length;
    setCurrentQuestion(questions.current[questionIndex.current]);
  };

  return { category, currentQuestion, skipQuestion, setNextQuestion };
};
