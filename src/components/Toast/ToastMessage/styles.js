import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;
const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to{
    opacity: 0;
    transform: translateY(100px);
  }
`;

const containerVariants = {
  default: css`
       background: ${({ theme }) => theme.colors.primary.main}
 `,
  danger: css`
        background: ${({ theme }) => theme.colors.danger.main}
  `,
  success: css`
        background: ${({ theme }) => theme.colors.success.main}
   `,
  //   info: css`
  //         background: ${({ theme }) => theme.colors.primary.main}
  //   `,
};

export const Container = styled.div`
    padding: 16px 32px;
    color: #FFF;
    border-radius: 4px;
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${messageIn} 0.3s;

    ${({ type }) => containerVariants[type] || containerVariants.default};

    ${({ isLeaving }) => isLeaving && css`
        animation: ${messageOut} 0.2s forwards;
    `}

    & + & {
        margin-top: 12px;
    }

    img{
        margin-right: 8px;
    }
`;
