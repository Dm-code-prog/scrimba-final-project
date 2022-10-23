import { useState } from 'react';
import { S } from './style';
import { Quiz } from './Quiz';
import { AppLayout } from './AppLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const App = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    return (
        <QueryClientProvider client={new QueryClient()}>
            <ReactQueryDevtools initialIsOpen={false} />
            <AppLayout quizStarted={quizStarted}>
                {!quizStarted && (
                    <S.FlexColumnContainer>
                        <S.H1>Quizzical</S.H1>
                        <span> Some description</span>
                        <S.Button.start
                            onClick={() => {
                                setQuizStarted(true);
                            }}
                        >
                            Start Quiz
                        </S.Button.start>
                    </S.FlexColumnContainer>
                )}
                {quizStarted && <Quiz />}
            </AppLayout>
        </QueryClientProvider>
    );
};
