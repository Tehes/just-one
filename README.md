# Just One

Just One is a quick, no-setup web helper for the cooperative word game. It replaces the physical
card deck with five randomized words per round, so you can play with a single shared device at the
table. The UI and word list are in German.

## What it does

- Shuffles a curated word list and shows five words per card.
- Provides a short rolling animation to hide the next word from the guesser.
- Includes an in-app rules overlay (German).

## What it does not do

- No scoring, hint validation, or duplicate detection.
- No multiplayer or networked features.

## Usage

Open `https://tehes.github.io/just-one/` on a shared device.

## How to use it at the table

- Play with a group (one guesser, at least two hint-givers).
- Use one shared device and pass it to the guesser each round.
- The guessing player taps "Neue Karte" and immediately turns the display towards the other players.
- The guessing player chooses a number from 1 to 5.
- All other players see the word and write down exactly one hint each (no coordination).
- Compare hints and cross out duplicates or very similar words.
- If all hints are crossed out, skip the word and start the next round.
- Show the remaining hints to the guesser.
- The guesser makes exactly one guess.
- Rotate the guesser and repeat with a new card.
- You still need pen/paper (or phones) to write hints; the app only replaces the cards.

## License

Free to use and modify, but not to sell. See `LICENSE.txt` (MIT with Commons Clause).
