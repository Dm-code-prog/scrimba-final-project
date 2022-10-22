import { S } from './style';
import { ReactComponent as LemonBlob } from './lemon-blob.svg';
import { ReactComponent as BabyBlob } from './baby-blob.svg';
import { useState } from 'react';
import { QuizForm } from './QuizForm';

/**
 * @typedef {array} Questions
 * @property {object} 0-100
 */

const PATTERN_TO_REMOVE = /&[A-Za-z&_!#*?+=$%^()/\\0-9]+;/g;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const removeTextArtefactsV2 = (entry) => {
  const JSON_STRING = JSON.stringify(entry);
  const JSON_STRING_WITHOUT_ARTIFACTS = JSON_STRING.replaceAll(PATTERN_TO_REMOVE, ' ');
  return JSON.parse(JSON_STRING_WITHOUT_ARTIFACTS);
};

const extractQuestions = (questions) => {
  const questionWithoutArtefacts = removeTextArtefactsV2(questions);
  return questionWithoutArtefacts.map((question) => ({
    question: question.question,
    answers: shuffleArray([question.correct_answer, ...question.incorrect_answers]),
    correctAnswer: question.correct_answer,
    selectedAnswer: null,
  }));
};

const AppLayout = ({ children, quizStarted }) => {
  return (
    <S.AppContainer>
      <S.LemonBlobContainer quizStarted={quizStarted}>
        <LemonBlob />
      </S.LemonBlobContainer>
      <S.BabyBlobContainer quizStarted={quizStarted}>
        <BabyBlob />
      </S.BabyBlobContainer>
      {children}
    </S.AppContainer>
  );
};

export const App = () => {
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
    );
    const data = await response.json();
    setQuestions(extractQuestions(data.results));
  };

  const [quizStarted, setQuizStarted] = useState(false);
  return (
    <AppLayout quizStarted={quizStarted}>
      {!quizStarted && (
        <S.FlexColumnContainer>
          <h1>Quizzical</h1>
          <span> Some description</span>
          <S.BigButton
            onClick={() => {
              setQuizStarted(true);
              getQuestions();
            }}
          >
            Start Quiz
          </S.BigButton>
        </S.FlexColumnContainer>
      )}
      {quizStarted && questions.length === 0 && <h2>Loading the quiz...</h2>}
      {quizStarted && (
        <QuizForm
          questions={questions}
          setQuestions={setQuestions}
          getQuestions={getQuestions}
        />
      )}
    </AppLayout>
  );
};
