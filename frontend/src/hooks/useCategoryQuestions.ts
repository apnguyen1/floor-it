import { RefObject, useEffect, useRef, useState } from 'react';
import { shuffleArray } from '../utils/shuffler.ts';
import { fetchCategoryData } from '../utils/fetch.ts';
import { CategoryContent, Question } from '../screens/Game/GameScreen.type.ts';

/**
 *`useCategoryQuestions` manages the state and logic for fetching, shuffling, and
 * navigating through a set of trivia questions based on the selected category.
 *
 * @param {string[]} selectedCategory - The list of selected categories from which a
 *   random category is chosen.
 */
export const useCategoryQuestions = (selectedCategory: string[]) => {
  // the selected category to fetch
  const [category, setCategory] = useState<CategoryContent | undefined>(undefined);
  // the question to display
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(
    undefined,
  );
  // fuzzy matching threshold, defaults to 0.6
  const [fuzzyMatchingThreshold, setFuzzyMatchingThreshold] = useState<number>(0.6);
  // A reference to the list of questions
  const questions = useRef<Question[]>([]);
  // a reference to track the current index of question to display
  const questionIndex = useRef(0);

  // a reference to the skip audio
  const skipAudio = useRef(new Audio('/sounds/skip.mp3'));
  // a reference to the correct guess audio
  const correctAudio = useRef(new Audio('/sounds/correct.mp3'));

  /**
   * Fetches and loads the category questions when the selected category changes.
   * - Selects a random category from the given list.
   * - Fetches the corresponding JSON file containing questions.
   * - Shuffles and sets the question list.
   */
  useEffect(() => {
    if (!selectedCategory.length) return;
    const categoryFile =
      shuffleArray(selectedCategory)[0].toLowerCase().replace(/\s/g, '_') + '.json';

    fetchCategoryData(categoryFile)
      .then((data) => {
        setCategory(data);
        questions.current = shuffleArray(data.questions);
        setCurrentQuestion(questions.current[0]);
        // set fuzzy matching threshold if specified in data
        if (data.fuzzy_matching_threshold) {
          setFuzzyMatchingThreshold(data.fuzzy_matching_threshold);
        }
      })
      .catch((e) => console.error('Failed to fetch category:', e));
  }, [selectedCategory]);

  /**
   * Plays audio to the given audio reference.
   *
   * @param soundRef the audio reference to play.
   */
  const playAudio = (soundRef: RefObject<HTMLAudioElement>) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((error) => console.error('Audio playback failed:', error));
    }
  };

  /**
   * Skips the current question and moves to the next one.
   * - Plays the "skip" sound effect.
   * - Advances the index in a circular manner.
   */
  const skipQuestion = () => {
    playAudio(skipAudio);
    questionIndex.current = (questionIndex.current + 1) % questions.current.length;
    setCurrentQuestion(questions.current[questionIndex.current]);
  };

  /**
   * Advances to the next question when a correct answer is given.
   * - Plays the "correct answer" sound effect.
   * - Moves to the next question in a circular manner.
   */
  const setNextQuestion = () => {
    playAudio(correctAudio);
    questionIndex.current = (questionIndex.current + 1) % questions.current.length;
    setCurrentQuestion(questions.current[questionIndex.current]);
  };

  return {
    category,
    currentQuestion,
    skipQuestion,
    setNextQuestion,
    fuzzyMatchingThreshold,
  };
};
