import styled, { css } from 'styled-components';

export default styled.button`
  height: 52px;
  border-radius: 4px;
  padding: 0 16px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.dark};
  padding: 0 16px;
  font-size: 16px;
  transition: border-color ease-in 2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color:  ${({ theme }) => theme.colors.textPrimary.light};
  transition: background 0.2s ease-in;

  &:hover{
    background: ${({ theme }) => theme.colors.primary.main};
  }

  &:active{
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled{
    background: #CCC;
    cursor: not-allowed;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};


  &:hover{
    background: ${theme.colors.danger.main};
  }

  &:active{
    background: ${theme.colors.danger.dark};
  }
  `}
`;
