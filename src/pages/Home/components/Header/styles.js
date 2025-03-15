import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent} ;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.gray[100]};
  padding-bottom: 16px;
  strong {
    font-size: 24px;
  }

  a{
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover{
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.textPrimary.light}
    }
  }
`;
