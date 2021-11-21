const series = require("./data");
const { fancyLogSeriesReport } = require("./utils");
module.exports = function SeriesTracker(series) {
  this.numberOfWatched = 0;
  this.numberOfUnWatched = 0;
  this.series = [];
  this.lastSerie = undefined;
  this.currentSerie = undefined;
  this.nextSerie = undefined;
  const setInitialWatchedAndUnWatchedNumber = () => {
    for (var i = 0; i < series.length; i++) {
      if (series[i].hasOwnProperty("isWatched")) {
        if (series[i].isWatched) {
          this.numberOfWatched++;
        } else {
          this.numberOfUnWatched++;
        }
      } else {
        this.numberOfUnWatched++;
      }
    }
  }

  const setInitialLastSerie = () => {
    let seriesThatHasFinishedDate = [];
    for (let i = 0; i < series.length; i++) {
      if (series[i].hasOwnProperty("finishedDate")) {
        seriesThatHasFinishedDate.push(series[i].finishedDate)
      }
    }
    var latestDate = seriesThatHasFinishedDate.reduce(function (a, b) { return a > b ? a : b; });
    for (let i = 0; i < series.length; i++) {
      if (series[i].hasOwnProperty("finishedDate")) {
        if (series[i].finishedDate == latestDate) {
          this.lastSerie = series[i];
        }
      }
    }
  }

  const setInitialCurrentSerie = () => {
    for (var i = 0; i < series.length; i++) {
      if (series[i].hasOwnProperty("isCurrent")) {
        if (series[i].isCurrent) {
          this.currentSerie = series[i];
        }
      }
    }
  }

  const setInitialNextSerie = () => {
    for (var i = 0; i < series.length; i++) {
      if (series[i].hasOwnProperty("isCurrent")) {
        if (series[i].isCurrent) {

        } else {
          if (series[i].finishedDate === null) {
            this.nextSerie = series[i];
          }
        }
      } else {
        if (series[i].finishedDate === null) {
          this.nextSerie = series[i];
        }

      }
    }
  }

  //set initial watched and unwatched number 
  setInitialWatchedAndUnWatchedNumber();

  // set initial lastSerie
  setInitialLastSerie();

  //set initial currentSerie
  setInitialCurrentSerie();

  //set initial nextSerie
  setInitialNextSerie();

  this.add = function (serie) {
    this.series.push(serie);
    if (serie.hasOwnProperty("isWatched")) {
      if (serie.isWatched) {
        this.numberOfWatched++;
        if (this.lastSerie == undefined) {
          this.lastSerie = serie;
        }
        if (serie.finishedDate > this.lastSerie.finishedDate) {
          this.lastSerie = serie;
        }
        // Update the count of watched series: "numberOfWatched"
        // Check for "lastSerie" property, set if we don't.
        // Check for "lastSerie"'s finishedDate, if the serie's "finishedDate" prop is greater,
        // set "lastSerie" prop to "serie" object.
      } else {
        this.numberOfUnWatched++;
        if (serie.hasOwnProperty("isCurrent")) {
          if (this.currentSerie == undefined) {
            this.currentSerie = serie;
          } else {
            this.nextSerie = serie;
          }
        }
        // If a serie hasn't been watched:
        // Check if serie has "isCurrent" prop
        // Check if we have a "currentSerie" property. Set if we don't.
        // Check if we have a "nextSerie" property as well - if we didn't
        // set the .currentSerie property, set the .nextSerie property.
      }
    }

    //it should also update the number of series marked as watched / unwatched:
    //"numberOfWatched" and "numberOfUnWatched"
  };

  //check to see if we have series to process
  if (series.length > 0) {
    for (var i = 0; i < series.length; i++) {
      this.series.push(series[i]);
    }
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
  }

  this.finishSerie = function () {
    this.series = this.series.reduce(function (previousValue, currentValue) {
      if (currentValue.isCurrent) {
        currentValue.isCurrent = false;
        currentValue.isWatched = true;
        previousValue.push(currentValue)

      } else {
        previousValue.push(currentValue)
      }
      return previousValue;
    }, [])
    this.lastSerie = this.currentSerie;

    function setCurrentSerie(series, nextSerie) {
      return series.reduce(function (previousValue, currentValue) {
        if (currentValue.name === nextSerie.name) {
          currentValue.isCurrent = true;
          currentValue.isWatched = true;
          previousValue.push(currentValue)

        } else {
          previousValue.push(currentValue)
        }
        return previousValue;
      }, [])
    }
    this.series = setCurrentSerie(this.series, this.nextSerie)
    this.currentSerie = this.nextSerie;
    this.nextSerie = this.series.find(serie => !serie.isWatched)
    this.numberOfWatched++;
    this.numberOfUnWatched--;
    // find and update currently watching serie in "this.series" array
    // update "lastSerie" with the finished one
    // set "currentSerie" with the next one
    // set new nextSerie value with the next one which has not been watched.
    // update "numberOfWatched" and "numberOfUnWatched" props
  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}



/* const q = new SeriesTracker(series); */
// const repsonse = mySeriesTracker.consoleLog();
// const repsonse = mySeriesTracker.finishSerie();
// console.log(repsonse)
// Case 1
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.printSeriesReport(); */

// Case 2
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.finishSerie();
mySeriesTracker.printSeriesReport(); */

// Case 3
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
const newSerie = {
  id: "9",
  name: "Lost",
  genre: "Adventure",
  directorId: "4"
};
mySeriesTracker.add(newSerie);
mySeriesTracker.printSeriesReport(); */
