let mongoose = require('mongoose'),
    Results  = mongoose.model('Results');

module.exports = {
  Register: _Register,
  Login: _Login,
  GetResults: _GetResults,
  GetResultsByDate: _GetResultsByDate,
  GetStats: _GetStats,
  UpdateResults: _UpdateResults
}

function _Register (req, res) {
  res.status(200).jsonp({message: "Register"});
}

function _Login (req, res) {
  res.status(200).jsonp({message: "Login"});
}

function _GetResults (req, res) {
  let { lotery, today, yesterday } = req.query;

  let dates = [ today, yesterday ],
      fResults = [];
  Results.find({
    dateStr: {
      $in: dates
    },
    lotery: lotery || "Lotto Activo"
  })
  .exec(function (err, results) {
    if (err) {
      _handleError(req, res, err);
      return;
    }
    if (!results || results.length == 0) {
      fResults = new Array(2).fill(new Results()).map(function(elem, index) {
        elem.dateStr = dates[index];
        return _transform(elem);
      });
    } else {
      fResults = results.map(e => _transform(e));
    }
    let aux = {
      yesterday: fResults.find(e => (e.date === yesterday)),
      today: fResults.find(e => (e.date === today))
    }
    console.log("Enviando resultados", aux, fResults);
    res.status(200).jsonp({message: aux});
  });
}

function _GetResultsByDate (req, res) {

  let { date, form } = req.query;

  Results.findOne({
    dateStr: date
  })
  .exec(function (err, result) {
    if (err) {
      _handleError(req, res, err);
      return;
    }
    console.log("results: ", result);
    if (!result) {
      let emptyResult = (form === "plain") ? new Results() : _transform(new Results());
      console.log("emptyResult", emptyResult);
      emptyResult.date = date;
      res.status(200).jsonp({message: emptyResult});
      return;
    }

    if (form === "plain") {
      res.status(200).jsonp({message: result});
    } else {
      res.status(200).jsonp({message: _transform(result)});
    }
  });
}

function _GetStats (req, res) {
  let stats = {
    lastWeek: {
      stat: [0,1,3,0,1,0,4]
    },
    lastMonth: {
      stat: [...Array(30).keys()].map((e) => {
        return Math.floor(Math.random()*3)
      })
    },
    byDayOfWeek: {
      times: 10,
      period: '20 weeks'
    },
    byPosition: {
      times: 3,
      period: '20 weeks'
    }
  };
  res.status(200).jsonp({message: stats});
}

function _UpdateResults (req, res) {
  let _body = req.body;
  let cResults = new Results(_body);
  Results.findOne({
    dateStr: _body.dateStr
  })
  .exec(function (err, result) {
    if (err) {
      _handleError(req, res, err);
      return;
    }
    if (!result) {
      result = cResults;
    } else {
      result.results = cResults.results;
    }
    result.save(function (err) {
      if (err) {
        _handleError(req, res, err);
        return;
      }
      res.status(200).jsonp({message: result});
    });
  });
}

function _transform({ dateStr, results }) {
  let list = {
    m: [ results["9:00 am"], results["10:00 am"], results["11:00 am"] ],
    t: [ results["12:00 m"], results["1:00 pm"], results["3:00 pm"] ],
    n: [ results["4:00 pm"], results["5:00 pm"], results["6:00 pm"], results["7:00 pm"] ]
  };
  return {
    date: dateStr,
    list: list
  };
}

function _handleError(req, res, err, custom) {
  console.log("Error en " + JSON.stringify(req.route), err);
  let message = custom ? {message: err} : {message: "Error interno"};
  res.status(400).jsonp(message);
  return;
}
