import numeral from 'numeral';

const getRootMeanSquare = arr => {
    const sqr = arr.map(v => v * v);
    const sum = sqr.reduce((acc, v) => acc + v);
    const avg = Math.sqrt(sum) / arr.length;
    return avg;
};

export const createRange = (min, max, step) => {
    let arr = [],
        i = min;

    while (i <= max + step) {
        arr.push(i);
        i += step;
    }

    return arr;
};

export const getRandomIndex = ln => Math.floor(Math.random() * ln);

export const randomizeCaseValues = dollarAmounts => {
    return dollarAmounts
        .map(dollarAmount => ({
            dollarAmount,
            caseId: Math.random().toString()
        }))
        .sort((a, b) => a.caseId - b.caseId)
        .reduce((cases, { caseId, dollarAmount }, index) => {
            cases.push({
                caseId,
                dollarAmount,
                displayNumber: (index + 1).toString(),
                isAvailable: true
            });

            return cases;
        }, []);
};

export const convertToNth = num => {
    const str = num.toString();
    const lastChar = str[str.length - 1];

    if (lastChar === '1') {
        return num + 'st';
    } else if (lastChar === '2') {
        return num + 'nd';
    } else if (lastChar === '3') {
        return num + 'rd';
    } else {
        return num + 'th';
    }
};

export const getRoundTone = cases => {
    const values = cases.map(c => c.dollarAmount);
    const avg = getRootMeanSquare(values);

    if (avg < 50000) return 0;
    if (avg < 100000) return 1;
    if (avg < 250000) return 2;
    if (avg < 500000) return 3;
    return 4;
};

export const markCaseUnavailable = (cases, caseId) => {
    return cases.map(c => {
        if (c.caseId === caseId) {
            c.isAvailable = false;
        }

        return c;
    });
};

export const getCaseDisplayNumber = game => {
    if (!game.cases) return null;
    return game?.cases.find(c => c.caseId === game.playerCaseId)?.displayNumber;
};

export const makeOffer = (cases, playerCaseId) => {
    const amts = cases.reduce((acc, c) => {
        if (c.isAvailable || c.caseId === playerCaseId) {
            acc.push(c.dollarAmount);
        }
        return acc;
    }, []);
    const mean = getRootMeanSquare(amts);
    const rates = createRange(1, 1.2, 0.01);
    const randomIndex = getRandomIndex(rates.length);

    return mean * rates[randomIndex];
};

export const toDollar = n => {
    if (!n) return null;
    return n < 1 ? `$${n}` : numeral(n).format('$0,0');
};

export const toPct = n => {
    if (!n) return '0%';
    numeral(n).format('%');
};
