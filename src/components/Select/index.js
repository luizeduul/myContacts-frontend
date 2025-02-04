import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.backgroundWhite};
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color ease-in 2s;
  appearance: none;

  &:focus{
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
