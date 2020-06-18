import { rates } from './static';

export const getAvg = arr => {
    let sum = arr.reduce((acc, i) => {
        return acc + i;
    }, 0);

    return sum / arr.length
};

export const avg = arr => {
    let amt = 0;
    let ln = 0;
    for(let x in arr) {
        if(arr[x].available) {
            amt += arr[x].amount * 100;
            ln++
        }
    }
    return (amt / 100) / ln;
}

export const history = arr => {
    return 3 - getAvg(arr).toFixed(0);
}

export const random = item => {
    return Math.floor(Math.random() * item.length);
}

export const shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    let newArr = [];
    for(let x in arr) {
        newArr.push({
            number: parseInt(x) + 1,
            amount: arr[x][0],
            level: arr[x][1],
            available: true
        });
    }

    return newArr;
}

export const offer = (lastThree, cases) => {
    let average = avg(cases);
    console.log({ average });
    let aggresiveness = history(lastThree);
    console.log({ aggresiveness });
    console.log({ rate: rates[aggresiveness] });
    let index = random(rates[aggresiveness]);
    console.log({ index })
    let multiplier = rates[aggresiveness][index];
    console.log({ multiplier })
    
    return (average * multiplier).toFixed(0);
}