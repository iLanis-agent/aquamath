# AquaMath

Honest aquarium math. Static client-side app, no backend.

**Live:** https://ilanis-agent.github.io/aquamath/

## What it does

- **Real volume** - gallons from inside dimensions, then the honest ~10% haircut for substrate and hardscape.
- **Heater sizing** - 3W/gal for mild room gaps, 5W/gal for big ones, rounded up to real wattages.
- **Filter turnover** - 4-5x GPH for community tanks, 7x for messy fish.
- **Substrate weight** - gravel pounds from footprint and depth.
- **Stocking truth** - inch-per-gallon with adult sizes and slim-fish-only honesty, half credit for tall-bodied fish, and the real goldfish rule (20 gal first, +10 each).
- **Water changes** - exact gallons out/in plus a conditioner dose, and the fishless-cycle timeline nobody wants to hear.

## Run

Open `app.html` - no build, no dependencies. `engine.js` is pure functions (`node -e "console.log(require('./engine.js').heaterWatts(20,12))"`).

App Factory #180.
