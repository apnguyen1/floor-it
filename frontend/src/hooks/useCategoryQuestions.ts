import { RefObject, useEffect, useRef, useState } from 'react';
import { shuffleArray } from '../utils/shuffler.ts';
import { fetchCategoryData } from '../utils/fetch.ts';
import { CategoryContent, Question } from '../screens/Game/GameScreen.type.ts';

/**
 *`useCategoryQuestions` manages the state and logic for fetching, shuffling, and
 * navigating through a set of trivia questions based on the selected categories.
 *
 * @param {string[]} selectedCategories - The list of selected categories to play
 *   through in sequence.
 */
export const useCategoryQuestions = (selectedCategories: string[]) => {
  // All selected categories to play through
  const [allCategories, setAllCategories] = useState<string[]>([]);
  // Current category index in the sequence
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  // the selected category to fetch
  const [category, setCategory] = useState<CategoryContent | undefined>(undefined);
  // the question to display
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(
    undefined,
  );
  // fuzzy matching threshold, defaults to 0.6
  const [fuzzyMatchingThreshold, setFuzzyMatchingThreshold] = useState<number>(0.6);
  // checks whether the current question was skipped
  const [isSkipped, setIsSkipped] = useState(false);
  // A reference to the list of questions
  const questions = useRef<Question[]>([]);
  // a reference to track the current index of question to display
  const questionIndex = useRef(0);
  // a reference to the skip audio
  const skipAudio = useRef(new Audio('/sounds/skip.mp3'));
  // a reference to the correct guess audio
  const correctAudio = useRef(new Audio('/sounds/correct.mp3'));

  /**
   * Initialize the allCategories state when selectedCategories changes
   */
  useEffect(() => {
    if (selectedCategories.length) {
      // Shuffle the selected categories to randomize the play order
      const shuffledCategories = shuffleArray([...selectedCategories]);
      setAllCategories(shuffledCategories);
      setCurrentCategoryIndex(0);
    }
  }, [selectedCategories]);

  /**
   * Advances to the next category in the sequence.
   * @param skip Optional number of categories to skip (default: 1)
   * @returns {boolean} True if there's a next category, false if we've completed all
   *   categories
   */
  const goToNextCategory = (skip: number = 1): boolean => {
    // Check if we have more categories to play
    const targetIndex = currentCategoryIndex + skip;
    if (targetIndex < allCategories.length) {
      setCurrentCategoryIndex(targetIndex);
      return true;
    }
    return false;
  };

  /**
   * Gets the total number of categories and current category position
   * @returns An object with total categories and current position
   */
  const getCategoryProgress = () => {
    return {
      current: currentCategoryIndex + 1,
      total: allCategories.length,
    };
  };

  /**
   * Fetches and loads the current category questions.
   */
  useEffect(() => {
    if (!allCategories.length) return;

    const categoryFile =
      allCategories[currentCategoryIndex].toLowerCase().replace(/\s/g, '_') + '.json';

    questions.current = [];
    questionIndex.current = 0;
    setCurrentQuestion(undefined);
    setIsSkipped(false);

    fetchCategoryData(categoryFile)
      .then((data) => {
        setCategory(data);
        questions.current = shuffleArray(data.questions);
        setCurrentQuestion(questions.current[0]);
        if (data.fuzzy_matching_threshold) {
          setFuzzyMatchingThreshold(data.fuzzy_matching_threshold);
        }
      })
      .catch((e) => console.error('Failed to fetch category:', e));
  }, [allCategories, currentCategoryIndex]);

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
    if (isSkipped) {
      return;
    }
    playAudio(skipAudio);
    setIsSkipped(true);
    setTimeout(() => {
      questionIndex.current = (questionIndex.current + 1) % questions.current.length;
      setCurrentQuestion(questions.current[questionIndex.current]);
      setIsSkipped(false);
    }, 3000);
  };

  /**
   * Advances to the next question when a correct answer is given.
   * - Plays the "correct answer" sound effect.
   * - Moves to the next question in a circular manner.
   */
  const setNextQuestion = () => {
    if (isSkipped) return;
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
    isSkipped,
    goToNextCategory,
    getCategoryProgress,
  };
};
