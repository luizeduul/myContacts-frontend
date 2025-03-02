import styles from 'styled-components';

export const Container = styles.div`
  position: fixed;
  bottom: 48px;
  z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;
