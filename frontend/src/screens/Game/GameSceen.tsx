import { Box } from '@mui/material';
import Dictation from '../../utils/Dictation.tsx';
import '../../styles/App.css';
import { useState } from 'react';
import { Command } from '../../utils/command.interface.ts';

export const GameScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inGame, setInGame] = useState(false);
  const data = {
    name: 'LoL Champion Titles',
    preview_img: 'default-preview.png',
    preview_desc: "Guess the LoL champion's name by their title!",
    type: 'text',
    questions: [
      {
        question: 'the Darkin Blade',
        answers: ['Aatrox'],
        aliases: [],
      },
      {
        question: 'the Nine-Tailed Fox',
        answers: ['Ahri'],
        aliases: [],
      },
      {
        question: 'the Rogue Assassin',
        answers: ['Akali'],
        aliases: [],
      },
    ],
  };

  const nextQuestion = (answer: string) => {
    console.log(`Correct answer: ${answer}`);
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Game Over!');
    }
  };

  const currentQuestion = data.questions[currentQuestionIndex];

  const commands: Command[] = [
    {
      command: [...currentQuestion.answers, ...currentQuestion.aliases],
      callback: nextQuestion,
      isFuzzyMatch: true,
      matchInterim: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
  ];

  console.log(commands[0].command);

  return (
    <Box className={'content-container'}>
      <h2>{currentQuestion.question}</h2>
      <Dictation commands={commands} nextQuestion={nextQuestion} inGame={inGame} />
      <button onClick={() => setInGame((prev) => !prev)}>
        {inGame ? 'Stop' : 'Start'} Listening
      </button>
    </Box>
  );
};
