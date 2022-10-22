import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #f5f7fb;
  display: grid;
  place-items: center;
  font-family: 'Inter', ui-monospace;

  h2 {
    font-family: 'Karla Tamil Upright', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 37px;
    text-align: center;
    color: #293264;
  }

  span {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: #293264;
  }
`;

const BabyBlobContainer = styled.div`
  position: fixed;
  bottom: -3px;
  left: 0;

  > svg {
    transition: all 0.3s ease;
  }

  ${ifProp(
    'quizStarted',
    css`
      > svg {
        width: 140px;
        height: 140px;
      }
    `
  )}
`;

const LemonBlobContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;

  > svg {
    transition: all 0.5s ease;
  }

  ${ifProp(
    'quizStarted',
    css`
      > svg {
        width: 140px;
        height: 140px;
      }
    `
  )}
`;

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const Button = styled.button`
  border: none;
  background: #4d5b9e;
  border-radius: 15px;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  font-family: 'Inter', serif;
  font-weight: 600;

  color: #f5f7fb;
  &:focus {
    outline: none;
  }

  &:hover {
    scale: 1.05;
  }
`;

const BigButton = styled(Button)`
  width: 195px;
  height: 50px;
`;

const SaveButton = styled(Button)`
  width: 120px;
  height: 35px;
  font-size: 10.24px;
  line-height: 12px;
  text-align: center;
  border-radius: 10px;
  font-weight: 600;

  ${ifProp(
    'disabled',
    css`
      opacity: 0.5;
      pointer-events: none;
    `
  )}
`;

const RestartButton = styled(Button)`
  font-size: 10.24px;
  line-height: 12px;
  text-align: center;
  border-radius: 10px;
  font-weight: 600;
  width: 100px;
  height: 30px;
`;

export const S = {
  AppContainer,
  LemonBlobContainer,
  BabyBlobContainer,
  FlexColumnContainer,
  BigButton,
  SaveButton,
  RestartButton,
};
