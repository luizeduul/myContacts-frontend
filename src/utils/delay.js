/* eslint-disable no-promise-executor-return */
export default function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
