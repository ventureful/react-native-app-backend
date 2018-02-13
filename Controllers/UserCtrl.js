module.exports = {
  Register: _Register,
  Login: _Login,
  GetResults: _GetResults,
  GetStats: _GetStats
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
      m: ['aguila','ardilla','ballena'],
      t: ['cienpies', 'culebra', 'gallina'],
      n: ['gato','mono','chivo']
    }
  },{
    date: new Date(Date.now() - 24*3600000).getTime(),
    list: {
      m: ['chivo','mono','ballena'],
      t: ['gato', 'gallina', 'gallina'],
      n: ['culebra','ardilla','cienpies']
    }
  }];
  res.status(200).jsonp({message: results});
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