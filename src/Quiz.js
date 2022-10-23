import { S } from './style';
import { useState } from 'react';
import { extractQuestions } from './utils/common.utils';
import { TriviaAPI } from './API';
import { useQuery } from 'react-query';

export const Quiz = () => {
    const [responseSaved, setResponseSaved] = useState(false);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState({});

    const getQuestions = async () => {
        const response = await TriviaAPI.get(`?amount=5&category=9&difficulty=easy&type=multiple`);
        return extractQuestions(response.data.results);
    };

    const { isLoading, isError, refetch, isRefetching, data } = useQuery(
        'getQuestions',
        getQuestions,
        { refetchOnWindowFocus: false }
    );

    const handleSelect = (event, index) => {
        event.preventDefault();
        const [questionIndex, optionIndex] = index.split('-');
        setSelected((prev) => ({
            ...prev,
            [questionIndex]: Number(optionIndex),
        }));
    };

    const saveResponse = (event) => {
        event.preventDefault();
        setResponseSaved(true);
        data.forEach((question, index) => {
            if (question.correctAnswer === question.answers[selected[index]]) {
                setScore((prevScore) => prevScore + 1);
            }
        });
    };

    const handleRestart = async (e) => {
        e.preventDefault();
        setResponseSaved(false);
        setScore(0);
        setSelected({});
        await refetch();
    };

    const buttonDisabled = Object.keys(selected).length !== data?.length;

    if (isLoading || isRefetching) return <S.H1>Loading the Trivia...</S.H1>;

    if (isError) return <S.H1>Could not load the Trivia :(</S.H1>;

    return (
        <S.Form>
            {data.map((question, index) => (
                <S.Form.question key={index}>
                    <S.H2>{question.question}</S.H2>
                    <S.Form.question.options>
                        {question.answers.map((answer, i) => (
                            <S.Form.question.options.option
                                responseSaved={responseSaved}
                                correct={question.correctAnswer === answer}
                                key={`${index}-${i}`}
                                onClick={(e) => handleSelect(e, `${index}-${i}`)}
                                selected={selected[index] === i}
                            >
                                {answer}
                            </S.Form.question.options.option>
                        ))}
                    </S.Form.question.options>
                </S.Form.question>
            ))}
            {!responseSaved && (
                <S.Button.save onClick={(e) => saveResponse(e)} disabled={buttonDisabled}>
                    Check Answers
                </S.Button.save>
            )}
            {responseSaved && (
                <S.QuizEndedTab>
                    <S.H2>
                        You scored {score}/{data.length} correct answers
                    </S.H2>
                    <S.Button.restart onClick={handleRestart}>Play again</S.Button.restart>
                </S.QuizEndedTab>
            )}
        </S.Form>
    );
};
