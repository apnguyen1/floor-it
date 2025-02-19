import { RefObject, useEffect, useRef, useState } from 'react';
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

  const skipAudio = useRef(new Audio('/sounds/skip.mp3'));
  const correctAudio = useRef(new Audio('/sounds/correct.mp3'));

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

  const playAudio = (soundRef: RefObject<HTMLAudioElement>) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((error) => console.error('Audio playback failed:', error));
    }
  };

  const skipQuestion = () => {
    playAudio(skipAudio);
    questionIndex.current = (questionIndex.current + 1) % questions.current.length;
    setCurrentQuestion(questions.current[questionIndex.current]);
  };

  const setNextQuestion = () => {
    playAudio(correctAudio);
    questionIndex.current = (questionIndex.current + 1) % questions.current.length;
    setCurrentQuestion(questions.current[questionIndex.current]);
  };

  return { category, currentQuestion, skipQuestion, setNextQuestion };
};
