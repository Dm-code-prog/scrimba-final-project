import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #f5f7fb;
    display: grid;
    place-items: center;
    font-family: 'Inter', sans-serif;
`;

const FlexColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
`;

const BlobContainer = styled.div`
    position: fixed;
    > svg {
        transition: all 0.3s ease;
    }

    ${ifProp(
        'quizStarted',
        css`
            > svg {
                width: 120px;
                height: 120px;
            }
        `
    )}
`;

BlobContainer.lemon = styled(BlobContainer)`
    top: 0;
    right: 0;
`;

BlobContainer.baby = styled(BlobContainer)`
    bottom: -4px;
    left: 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-width: 550px;
    padding: 20px;
`;

Form.question = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding: 20px;
    border-bottom: 1px solid #dbdef0;
`;

Form.question.options = styled.div`
    display: flex;
    column-gap: 28px;
    width: 100%;

    > * {
        flex-shrink: 1;
    }
`;

Form.question.options.option = styled.button`
    min-width: 64px;
    padding: 4px 10px;
    font-size: 10px;
    color: #293264;
    background: transparent;
    border: 1px solid #4d5b9e;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;

    ${ifProp('responseSaved', 'opacity: 0.5; pointer-events: none;')};

    ${({ responseSaved, correct, selected }) => {
        if (!responseSaved && selected) {
            return css`
                background: #d6dbf5;
                border-color: transparent;
            `;
        }
        if (responseSaved && correct) {
            return css`
                background: #94d7a2;
                border-color: transparent;
                opacity: 1;
            `;
        }

        if (responseSaved && selected && !correct) {
            return css`
                background: #f8bcbc;
            `;
        }
    }}
`;

const H1 = styled.h1`
    font-size: 32px;
`;

const H2 = styled.h2`
    font-size: 16px;
`;

const Button = styled.button`
    border: none;
    background: #4d5b9e;
    font-style: normal;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 600;
    color: #f5f7fb;

    &:hover {
        scale: 1.05;
    }

    ${ifProp(
        'disabled',
        css`
            opacity: 0.5;
            pointer-events: none;
        `
    )}
`;

Button.start = styled(Button)`
    width: 195px;
    height: 50px;
    border-radius: 15px;
`;

Button.save = styled(Button)`
    width: 120px;
    height: 35px;
    font-size: 10px;
    border-radius: 10px;
    margin: 20px;
`;

Button.restart = styled(Button)`
    font-size: 10px;
    border-radius: 10px;
    width: 100px;
    height: 30px;
`;

const QuizEndedTab = styled.div`
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
`;

export const S = {
    AppContainer,
    FlexColumnContainer,
    Button,
    H1,
    H2,
    BlobContainer,
    Form,
    QuizEndedTab,
};
