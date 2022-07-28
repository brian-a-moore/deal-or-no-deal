import { toDollar } from './helpers';

export const CASES = [
    0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000,
    25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000
];

export const DIALOGS = {
    GAME_START: name =>
        `Welcome ${name}, to Deal or No Deal where you have a shot at $1,000,000! But before we start, we need you to select your case...`,
    PLAYER_CASE_SELECTED: n =>
        `Ah, case #${n}, great choice! But, time will tell if ${n} is your lucky number or not...`,
    ROUND_START: (rnd, num) => `It's the ${rnd} round. Select ${num}...`,
    ROUND_RESPONSE: [
        "Wow, that was a great round! Let's see how the Dealer feels...",
        "That was pretty good, let's see how the Dealer reacts...",
        "Okay, you made it through the round. Let's see the offer...",
        "That was tough to watch. Let's see how the Dealer reacts...",
        "Yikes, I don't think that could've gone any worse. Let's see the offer..."
    ],
    DEAL: offer =>
        `You've decided to accept the Dealer's offer for ${toDollar(
            offer
        )}, but what kind of deal did you make?`,
    NO_DEAL: name => `No Deal! ${name}... are ready for the next round?`,
    FINAL_CHOICE: switched => {
        if (switched) {
            return "You chose to switch cases... let's find out what kind of deal you made...";
        }
        return "You decided to stick with your lucky number... let's find out what kind of deal you made...";
    }
};

export const STATUS = {
    GAME_START: ['GAME_START', 'PLAYER_CASE_SELECT'],
    PLAYER_CASE_SELECT: ['PLAYER_CASE_SELECT', 'PLAYER_CASE_SELECTED'],
    PLAYER_CASE_SELECTED: ['PLAYER_CASE_SELECTED', 'ROUND_START'],
    ROUND_START: ['ROUND_START', 'IN_ROUND'],
    IN_ROUND: ['IN_ROUND', 'ROUND_END'],
    ROUND_END: ['ROUND_END', 'CALCULATE_OFFER'],
    CALCULATE_OFFER: ['CALCULATE_OFFER', 'OFFER_PENDING'],
    DEAL: ['DEAL', 'RESULT'],
    FINAL_CHOICE: ['FINAL_CHOICE', 'RESULT'],
    NO_DEAL: ['NO_DEAL', null],
    OFFER_PENDING: ['OFFER_PENDING', null],
    FINAL_ROUND: ['FINAL_ROUND', null],
    RESULT: ['RESULT', null]
};

export const ROUNDS = [
    [6, 'six cases'],
    [5, 'five cases'],
    [4, 'four cases'],
    [3, 'three cases'],
    [2, 'two cases'],
    [1, 'one case'],
    [1, 'one case'],
    [1, 'one case'],
    [1, 'one case'],
    [1, 'one last case']
];
