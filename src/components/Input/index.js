import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  height: 52px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.backgroundWhite};
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color ease-in 2s;

  &:focus{
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`;
