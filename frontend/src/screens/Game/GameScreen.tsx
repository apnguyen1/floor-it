import { Box } from '@mui/material';
import { Player } from '../../components/Player.tsx';
import QuestionDisplay from '../../components/QuestionDisplay.tsx';
import React from 'react';
import { Command } from '../../types/command.interface.ts';

export const GameScreen: React.FC = () => {
  // TODO TO BE IMPLEMENTED
  const nextQuestion = (answer: string) => {
    return answer;
  };

  const data = {
    name: 'LoL Champion Titles',
    preview_img: 'default-preview.png',
    preview_desc: "Guess the LoL champion's name by their title!",
    type: 'text',
    questions: [
      { question: 'the Darkin Blade', answers: ['Aatrox'], aliases: [] },
      { question: 'the Nine-Tailed Fox', answers: ['Ahri'], aliases: [] },
      { question: 'the Rogue Assassin', answers: ['Akali'], aliases: [] },
    ],
  };

  const commands: Command[] = data.questions.map((question) => ({
    command: [...question.answers, ...question.aliases],
    callback: (answer: string) => nextQuestion(answer),
    isFuzzyMatch: true,
    matchInterim: true,
    fuzzyMatchingThreshold: 0.6,
    bestMatchOnly: true,
  }));

  return (
    <Box
      className="game-box"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: 2,
      }}
    >
      <Player playerName={'P1'} />
      <QuestionDisplay commands={commands} />
      <Player playerName={'P2'} />
    </Box>
  );
};
