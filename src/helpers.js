export function reShuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function pointCalculation(hand) {
    let adjustedAce = false,
        points = 0;

    hand.map((card, _index) => {
        if (card.name == 'A' && !adjustedAce) {
            adjustedAce = true;
            points = points + 10;
        }
        points = points + card.value;
    });

    if (adjustedAce && points > 21) {
        points = points - 10;
    }

    return points;
}