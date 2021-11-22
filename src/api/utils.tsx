import { instance } from 'api';
import SnackbarUtils from '../core/utils/SnackbarUtils';

export const checkUserExist = async (query: string) => {
  return await instance
    .get(`/Users/ifExists/${query}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      SnackbarUtils.error('Wystąpił problem z wyszukiwaniem');
    });
};
