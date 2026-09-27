/* AquaMath engine - honest aquarium math. Pure functions, no DOM. */
var AquaEngine = (function () {
  var GRAVEL_LB_PER_CUIN = 0.055; /* standard aquarium gravel */
  var HEATER_SIZES = [25, 50, 75, 100, 150, 200, 250, 300, 400];

  function r1(x) { return Math.round(x * 10) / 10; }

  /* gallons from inside dimensions in inches */
  function tankVolumeGal(L, W, H) {
    return r1(L * W * H / 231);
  }

  /* substrate and hardscape steal about a tenth of the box number */
  function realVolumeGal(nominalGal) {
    return r1(nominalGal * 0.9);
  }

  /* heater watts: 3 W/gal when room is close to tank temp, 5 W/gal for big deltas; round UP to a real size */
  function heaterWatts(gal, deltaF) {
    var rate = deltaF > 10 ? 5 : 3;
    var need = gal * rate;
    for (var i = 0; i < HEATER_SIZES.length; i++) {
      if (HEATER_SIZES[i] >= need) return HEATER_SIZES[i];
    }
    return Math.ceil(need / 50) * 50; /* multiple heaters territory */
  }

  /* filter turnover targets in gallons per hour */
  function filterGPH(gal) {
    return { min: gal * 4, target: gal * 5, messy: gal * 7 };
  }

  /* the inch-per-gallon rule, kept honest: slim fish only, and never for goldfish */
  function maxInches(gal, bodyType) {
    if (bodyType === 'slim') return gal;
    if (bodyType === 'tall') return Math.round(gal / 2 * 10) / 10;
    throw new Error('goldfish do not do inches - use goldfishCount');
  }

  /* fancy goldfish: 20 gal for the first, +10 each after */
  function goldfishCount(gal) {
    if (gal < 20) return 0;
    return 1 + Math.floor((gal - 20) / 10);
  }

  function stockingVerdict(adultInches, gal, bodyType) {
    if (bodyType === 'goldfish') {
      var c = goldfishCount(gal);
      return c === 0
        ? 'too small - goldfish need 20 gal for even one, plus 10 for each extra'
        : 'room for ' + c + ' fancy goldfish (20 gal first, +10 each) - skip the bowl math';
    }
    var cap = maxInches(gal, bodyType);
    if (adultInches <= cap * 0.8) return 'comfortably stocked (' + adultInches + ' of ~' + cap + ' adult inches)';
    if (adultInches <= cap) return 'fully stocked (' + adultInches + ' of ~' + cap + ' adult inches) - stay on the water changes';
    return 'overstocked (' + adultInches + ' over ~' + cap + ' adult inches) - adult size counts, not the pet-store size';
  }

  /* gravel for a footprint at a given depth */
  function substrateLbs(L, W, depthIn) {
    return Math.round(L * W * depthIn * GRAVEL_LB_PER_CUIN);
  }

  function waterChangeGal(gal, pct) {
    return r1(gal * pct / 100);
  }

  /* generic conditioner rule of thumb: 1 ml per 10 gal of NEW water */
  function conditionerMl(newWaterGal) {
    return r1(newWaterGal / 10);
  }

  function cycleWeeks() { return { min: 4, max: 6 }; }

  return {
    tankVolumeGal: tankVolumeGal, realVolumeGal: realVolumeGal,
    heaterWatts: heaterWatts, filterGPH: filterGPH,
    maxInches: maxInches, goldfishCount: goldfishCount, stockingVerdict: stockingVerdict,
    substrateLbs: substrateLbs, waterChangeGal: waterChangeGal, conditionerMl: conditionerMl,
    cycleWeeks: cycleWeeks
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = AquaEngine;
