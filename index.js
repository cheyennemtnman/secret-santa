var async = require('async'),
    _ = require('underscore'),
    config = require('./config'),
    peopleLeft = _.clone(config.people),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport(config.transporter);

/*
 * A recursive function to work out an appropriate recipient for a gift (when
 * passed a person). It ensures that you don't end up giving a present to
 * yourself, or end up having the same recipient as someone else.
 */
function getRecipient(person) {
  var index = Math.floor(Math.random() * peopleLeft.length),
      recipient = peopleLeft[index];

  if (recipient.name === person.name) {
    return getRecipient(person);
  }

  peopleLeft.splice(index, 1);
  return recipient;
}

/*
 * Loop through the original (config.people) people and, for each one, generate
 * an email with a recipient.
 */
async.eachSeries(config.people, function (person, callback) {
  var email = 'Hi ' + person.name.split(' ')[0] + ',<br><br>';
      email += 'This year, your secret santa recipient is: <strong>' + getRecipient(person).name + '</strong>.<br><br>';
      email += 'Regards,<br>Santa\'s little helper...';

  transporter.sendMail({
    from: config.email.name + ' <' + config.email.from + '>',
    to: person.email,
    subject: config.email.subject,
    html: email
  }, function (err, info) {
    console.log('Email sent for ' + person.name + '.');
    callback();
  });
}, function () {
  console.log('Completed.');
});