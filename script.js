/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

const suits = ['clubs', 'diamonds', 'hearts', 'spades']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const deck = []

for (const suit of suits) {
  for (const rank of ranks) {
    deck.push({ suit, rank })// suit: suit, rank: rank
  }
}
console.log(deck)

const game = {
  deck: [],
  selectedCards: []
}

const $hand = document.getElementById('hand')
const $controls = document.getElementById('controls')
const $draw = document.getElementById('draw')

function deal (numberOfCards = 5) {
  // if (!numberOfCards) {
  //   numberOfCards = 5
  // }
  game.deck = shuffle(shuffle(deck))
  const hand = game.deck.splice(0, numberOfCards)
  console.log(hand)
  //   const cards = []
  //   for (cosnt card of hand) {
  //     cards.push(`    <div class="card">
  //   <div class="number hearts">2</div>
  //   <div class="suit"><img src="images/hearts.png"></div>
  //   <div class="number hearts">2</div>
  // </div>`)
  //   }
  // $hand.innerHTML = cards.join('')
  $hand.innerHTML = hand.map(card => `<div class="card" data-card="${card.ran} of ${card.suit}">
    <div class="number ${card.suit}">${card.rank}</div>
    <div class="suit"><img src="images/${card.suit}.png"></div>
    <div class="number ${card.suit}">${card.rank}</div>
  </div>`
  ).join('')
}

$controls.addEventListener('click', event => {
  if (event.target.dataset.deal) {
    deal(event.target.dataset.deal)
  }
})

$hand.addEventListener('click', event => {
  const card = event.target.closest('.card')
  if (card) {
    card.classList.toggle('selected')
    if (card.classList.contains('selected')) {
      game.selectedCards.push(card.dataset.card)
    } else {
      const rankSuit = card.dataset.card
      const index = game.selectedCards.indexOf(rankSuit)
      game.selectedCards.splice(index, 1)
    }
  }
})
