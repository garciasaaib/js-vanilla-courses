var records = [
  { id: 1, username: 'franco', password: '1234', displayName: 'Fran', emails: [ { value: 'fran@example.com' } ] }
];

exports.findById = function(id, cb) {
  return new Promise(function (resolve, reject) {
    var idx = id - 1;
    if(records[idx]) {
      resolve(records[idx]);
    } else {
      reject(new Error('User ' + id + ' does not exist'));
    }
  })
}

exports.findByUsername = function(username, cb) {
  return new Promise(function (resolve, reject) {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return resolve(record);
      }
    }
    return reject(null);
  });
}
