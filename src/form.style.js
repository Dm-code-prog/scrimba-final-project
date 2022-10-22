import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 550px;
  padding: 20px;

  h3 {
    font-family: 'Karla', monospace;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #293264;
  }
`;

const Question = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #dbdef0;
  h3 {
    font-family: 'Karla', monospace;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #293264;
  }
`;

const Options = styled.div`
  display: flex;
  column-gap: 28px;
  width: 100%;

  > * {
    flex-shrink: 1;
  }
`;

const Option = styled.button`
  background: transparent;
  font-family: 'Inter', sans-serif;
  border: 0.794239px solid #4d5b9e;
  border-radius: 7.94239px;
  cursor: pointer;
  padding: 4px 10px;
  font-size: 10px;
  color: #293264;
  min-width: 64px;
  &:focus {
    outline: none;
  }

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

const FinishedQuizTab = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;

  h3 {
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12.8px;
    line-height: 15px;
    text-align: center;
    color: #293264;
  }
`;

export const FormS = {
  Form,
  Question,
  Options,
  Option,
  FinishedQuizTab,
};
