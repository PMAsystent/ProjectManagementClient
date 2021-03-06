import { taskPriority } from 'core/enums/task.priority';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const priorityNumberToString = (value: number) => {
  if (value <= 2) {
    return taskPriority.LOW;
  } else if (value <= 4) {
    return taskPriority.MEDIUM;
  } else {
    return taskPriority.HIGH;
  }
};

export const priorityStringToNumber = (value: string) => {
  if (value === taskPriority.LOW) {
    return 1;
  } else if (value === taskPriority.MEDIUM) {
    return 3;
  } else {
    return 5;
  }
};
