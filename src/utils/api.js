import { PLAYER_RECORD_FIXTURE } from './fixtures';

export const getName = () => localStorage.getItem('firstName') || '';

export const setName = firstName => {
    localStorage.setItem('firstName', firstName);
};

export const getRecord = () => {
    return localStorage.getItem('playerRecord') || PLAYER_RECORD_FIXTURE;
};

export const updateRecord = gameStats => {
    // localStorage.setItem('playerRecord', updatedPlayerRecord);
};

export const clearRecord = () => {
    localStorage.setItem('playerRecord', PLAYER_RECORD_FIXTURE);
};

export const resetEverything = () => {
    localStorage.removeItem('firstName');
    localStorage.removeItem('playerRecord');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
};
