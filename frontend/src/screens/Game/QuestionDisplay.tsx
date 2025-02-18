import { Box, Typography } from '@mui/material';
import TriviaQuestion from './TriviaQuestion.tsx';
import Dictation from './Dictation.tsx';
import { CategoryContent, Question } from '../../types/category.type.ts';
import { ReadyToPlay } from './ReadyToPlay.tsx';
import { createCommand } from '../../constants/config.ts';
import { useEffect, useRef, useState } from 'react';
import { Command } from '../../types/command.ts';
import { shuffleArray } from '../../utils/shuffler.ts';

interface QuestionDisplay {
  category: CategoryContent | undefined;
  inGame: boolean;
  onStartGame: () => void;
  onSwitchPlayers: () => void;
}

/**
 * Displays the category question
 *
 * @param category the chosen category to play
 * @param inGame determines whether the game has started
 * @param onStartGame begins game
 * @param onSwitchPlayers switches the player on correct answer
 */
export const QuestionDisplay = ({
  category,
  inGame,
  onStartGame,
  onSwitchPlayers,
}: QuestionDisplay) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const questionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(
    undefined,
  );
  useEffect(() => {
    if (category) {
      const shuffledQuestions = shuffleArray(category.questions);
      setQuestions(shuffledQuestions);
      questionIndex.current = 0;
      if (shuffledQuestions.length > 0) {
        setCurrentQuestion(shuffledQuestions[0]);
      }
    }
  }, [category]);

  useEffect(() => {
    if (currentQuestion) {
      setCommands([
        createCommand({
          command: currentQuestion.answers,
          callback: nextQuestion,
        }),
      ]);
    }
  }, [currentQuestion]);

  const nextQuestion = () => {
    if (questions.length === 0) return;

    questionIndex.current = (questionIndex.current + 1) % questions.length;
    setCurrentQuestion(questions[questionIndex.current]);
    onSwitchPlayers();
  };

  if (!category || !currentQuestion)
    return <Typography variant={'h3'}>Loading...</Typography>;

  return (
    <Box
      className="question-box"
      sx={{
        flex: 2,
        textAlign: 'center',
        padding: '16px',
        border: '15px solid black',
        borderRadius: '8px',
        minHeight: '100px',
      }}
    >
      {!inGame ? (
        <ReadyToPlay category={category} onStartGame={onStartGame} />
      ) : (
        <>
          <TriviaQuestion type={category.type} question={currentQuestion.question} />
          <Dictation commands={commands} />
        </>
      )}
    </Box>
  );
};
