const router = require("express").Router();

const { Country, State, City } = require("country-state-city");

// Countries
router.get("/countries", async (req, res) => {
  try {
    const countries = Country.getAllCountries().map((country) => {
      return { name: country.name, isoCode: country.isoCode };
    });
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json(err);
  }
});

// States
router.get("/:countryCode/states", async (req, res) => {
  try {
    const countryCode = req.params.countryCode;
    const state = State.getStatesOfCountry(countryCode).map((state) => {
      return { name: state.name, isoCode: state.isoCode };
    });
    res.status(200).json(state);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Cities
router.get("/:countryCode/:stateCode/cities", async (req, res) => {
  try {
    const countryCode = req.params.countryCode;
    const stateCode = req.params.stateCode;
    const cities = City.getCitiesOfState(countryCode, stateCode).map(
      (cities) => {
        return { name: cities.name };
      }
    );
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json(err);
  }
});

// All Cities
router.get("/cities", async (req, res) => {
  try {
    const { citySearch } = req.query;
    if (!citySearch) res.status(400).json({});
    const cities = City.getAllCities()
      .filter((city) =>
        city.name.toLowerCase().includes(citySearch.toLowerCase())
      )
      .slice(0, 20);
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
