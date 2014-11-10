var async = require('async'),
    config = require('./config'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport(config.transporter);

(function () {
  var people = Array.prototype.slice.call(config.people),
      relationships = [];

  /*
   * Firstly, we use Sattolo's algorithm to re-order our original array of
   * people. The algorithm ensures that no element in the resulting array has
   * the same index as in the original array, ensuring that no-one has
   * themselves as a recipient, and no recipient has more than one santa.
   */
  for (var i = people.length - 1; i > 0; i--) {
    var j = ~~(Math.random() * i),
        person = people[i];

    people[i] = people[j];
    people[j] = person;
  }

  /*
   * We then form a list of relationships by combining the original array and
   * the new (random) array. These loops are safe to perform as they contain no
   * asynchronous code within them.
   */
  for (i = 0; i < people.length; i++) {
    relationships.push([config.people[i], people[i]]);
  }

  /*
   * Lastly, we use the async library to iterate through the created
   * relationships to construct (and send) an email for each one.
   */
  async.eachSeries(relationships, function (relationship, callback) {
    var person = relationship[0],
        recipient = relationship[1],
        email = 'Hi ' + person.name.split(' ')[0] + ',<br><br>' +
                'This year, your secret santa recipient is: <strong>' + recipient.name + '</strong>.<br><br>' +
                'Regards,<br>Santa\'s little helper...';

    transporter.sendMail({
      from: config.email.from,
      to: person.email,
      subject: config.email.subject,
      html: email
    }, function (err) {
      console.log('Sending email to ' + person.name + ' (' + person.email + ')...');
      if (err) {
        return callback(err);
      }
      return callback();
    });
  }, function (err) {
    if (err) {
      throw new Error(err);
    }
    console.log('Completed.');
  });
})();