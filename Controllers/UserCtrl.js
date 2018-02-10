module.exports = {
  Register: _Register,
  Login: _Login,
  GetResults: _GetResults
}

function _Register (req, res) {
  res.status(200).jsonp({message: "Register"});
}

function _Login (req, res) {
  res.status(200).jsonp({message: "Login"});
}

function _GetResults (req, res) {
  let results = [{
    date: Date.now(),
    list: {
      m: [11,12,13],
      t: [23,23,43],
      n: [12,43,54]
    }
  }];
  res.status(200).jsonp({message: results});
}