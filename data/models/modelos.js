let Schema   = require('mongoose').Schema,
    mongoose = require('mongoose');

const DaylyResultSchema = new Schema ({
  "10:00 am": String,
  "11:00 am": String,
  "12:00 m" : String,
  "1:00 pm" : String,
  "3:00 pm" : String,
  "4:00 pm" : String,
  "5:00 pm" : String,
  "6:00 pm" : String,
  "7:00 pm" : String,
  "9:00 am" : String
});
const ResultSchema = new Schema ({
  date: {
    type: Date,
    required: true
  },
  dateStr: {
    type: String,
    required: true,
  },
  lotery: {
    type: String,
    required: true,
    default: "Lotto Activo",
  },
  results: {
    type: DaylyResultSchema,
    default: DaylyResultSchema
  }
});
const UserSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sessionToken: {
    type: String,
    required: true
  },
  following: {
    type: [ String ],
    default: []
  },
  followers: {
    type: [ String ],
    default: []
  },
  profile: {
    type: ProfileSchema,
    default: ProfileSchema
  },
  balance: {
    available: Number,
    default: 0
  },
  accountDetails: {
    transactions: [ String ],
  },
  pronostics: {
    type: [ ResultSchema ],
    default: []
  },
  stats: {
    type: StatsSchema,
    defatult: StatsSchema
  }
});

const StatsSchema = new Schema ({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  assertions: {
    type: Number,
    default: 0
  },
  effectiveness: {
    type: Number,
    default: 0
  }
});

const ProfileSchema = new Schema ({
  picture: {
    type: String,
    default: ''
  },
  telephone: {
    type: String,
    default: ''
  },
  bankDetails: {
    type: [ BankSchema ],
    default: []
  }
});

const BankSchema = new Schema ({
  personalId: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Results', ResultSchema);
