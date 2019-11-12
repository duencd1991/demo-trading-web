'use strict';

var fake = require('./ConsensusAnalysisFake');

exports.GetConsensus = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetConsensus(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}