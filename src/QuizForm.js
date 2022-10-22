import { FormS } from './form.style';
import { S } from './style';
import { useState } from 'react';

export const QuizForm = ({ questions, setQuestions, getQuestions }) => {
  const [responseSaved, setResponseSaved] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (event, index) => {
    event.preventDefault();
    const [questionIndex, optionIndex] = index.split('-');
    const newQuestions = [...questions];
    newQuestions[questionIndex].selectedAnswer = optionIndex;
    setQuestions(newQuestions);
  };

  const saveResponse = (event) => {
    event.preventDefault();
    setResponseSaved(true);
    questions.forEach((question) => {
      if (question.correctAnswer === question.answers[question.selectedAnswer]) {
        setScore((prevScore) => prevScore + 1);
      }
    });
  };

  const handleRestart = async (e) => {
    e.preventDefault();
    setResponseSaved(false);
    setScore(0);
    setQuestions([]);
    await getQuestions();
  };

  const buttonDisabled = questions.some((question) => question.selectedAnswer === null);

  return (
    <FormS.Form>
      {questions.map((question, index) => (
        <FormS.Question key={index}>
          <h3>{question.question}</h3>
          <FormS.Options>
            {question.answers.map((answer, i) => (
              <FormS.Option
                responseSaved={responseSaved}
                correct={question.correctAnswer === answer}
                key={`${index}-${i}`}
                onClick={(e) => handleSelect(e, `${index}-${i}`)}
                selected={question.selectedAnswer === `${i}`}
              >
                {answer}
              </FormS.Option>
            ))}
          </FormS.Options>
        </FormS.Question>
      ))}
      {!responseSaved && questions.length !== 0 && (
        <S.SaveButton
          onClick={(e) => saveResponse(e)}
          style={{ marginTop: '20px' }}
          disabled={buttonDisabled}
        >
          Check Answers
        </S.SaveButton>
      )}
      {responseSaved && (
        <FormS.FinishedQuizTab>
          <h3>
            You scored {score}/{questions.length} correct answers
          </h3>
          <S.RestartButton onClick={handleRestart}>Play again</S.RestartButton>
        </FormS.FinishedQuizTab>
      )}
    </FormS.Form>
  );
};
