import {isString} from 'lodash';

const INFO = "hello world";
export const getInfo = () => {
  return `${new Date().toISOString()} ${INFO}, ${isString(INFO)}`;
};

export default INFO;