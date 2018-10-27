// const Deck = function() {
//     this.cards = [
//         '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', 'Jh', 'Qh', 'Kh', 'Ah',
//         '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', 'Jd', 'Qd', 'Kd', 'Ad',
//         '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s', 'Js', 'Qs', 'Ks', 'As',
//         '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', '10c', 'Jc', 'Qc', 'Kc', 'Ac',
//     ]
// }

// const Player = function() {
//     this.cardOne;
//     this.cardTwo;
// }

var cards = [
    '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', 'Jh', 'Qh', 'Kh', 'Ah',
    '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', 'Jd', 'Qd', 'Kd', 'Ad',
    '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s', 'Js', 'Qs', 'Ks', 'As',
    '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', '10c', 'Jc', 'Qc', 'Kc', 'Ac',
]

// use to shuffle deck
function shuffle(deck) {
    var i = 0,
        j = 0,
        temp = null;

    for(i = deck.length - 1; i > 0; i -= 1) { // start from last card
        j = Math.floor(Math.random() * (i + 1)); // get random number 1 to remaining cards to shuffle    
        temp = deck[i]; // store current card in temp
        deck[i] = deck[j]; // place random card in current pos of deck
        deck[j] = temp; // place current card in prev pos of random card
    }

    return deck; // return shuffled deck
}

console.log(shuffle(cards));