# Weather Forecast Application

A beginner-friendly weather forecast web application built using HTML, CSS, and JavaScript. It uses the free Open-Meteo geocoding and forecast APIs, so no API key is required.

## Features

- Search for a city by name
- Display current temperature and feels-like temperature
- Display humidity and wind speed
- Show a simple weather description
- Switch between Celsius and Fahrenheit
- Handle invalid city names and network errors

## Project structure

```text
weather-forecast-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run the application

1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or run it with the VS Code Live Server extension.
4. Search for a city, for example Chennai.

An internet connection is required to retrieve weather data from Open-Meteo.

## Practice GitHub bug-fixing workflow

This starter repository intentionally contains a bug in the Fahrenheit conversion function in `script.js`.

### Bug to report

**Title:** Fahrenheit temperature conversion displays an incorrect value.

**Description:** When a user searches for a city and switches the temperature unit from Celsius to Fahrenheit, the application displays an incorrect temperature.

**Steps to reproduce:**
1. Open the application.
2. Search for a city.
3. Note the temperature in Celsius.
4. Click the °F button.
5. Compare the displayed value with the correct Fahrenheit conversion.

**Expected result:** Fahrenheit should equal `(Celsius × 9/5) + 32`.

**Actual result:** The application uses an incorrect conversion formula.

### Suggested fix

Create a branch named `bug-fix/temperature-conversion`, correct the formula in `convertTemperature()` in `script.js`, test both unit buttons, commit the change, push the branch, and open a pull request to `main`.

## Git commands

```bash
git clone YOUR_REPOSITORY_URL
cd weather-forecast-app

git checkout -b bug-fix/temperature-conversion

# After fixing and testing script.js:
git add script.js
git commit -m "Fix Fahrenheit temperature conversion"
git push -u origin bug-fix/temperature-conversion
```

Then open GitHub and create a pull request from `bug-fix/temperature-conversion` into `main`.

## Data source

- Open-Meteo Geocoding API: https://open-meteo.com/en/docs/geocoding-api
- Open-Meteo Forecast API: https://open-meteo.com/en/docs
