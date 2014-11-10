# secret-santa

Given a list of names and email addresses, this small Node.js module takes all of the hassle out of working out secret santa recipients. Simply run the module, and it'll email everyone in the list with their gift recipient.

## Usage

Firstly, install the dependencies...

    npm install

Then, create a `config.json` file in the root of the project and populate it with your configuration options (details below). The module uses [Nodemailer](http://www.nodemailer.com/) and supports all major email services (a list can be found [here](https://github.com/andris9/nodemailer-wellknown#supported-services)).

In the example `config.json` file below, I'm using [SendGrid's free plan](https://sendgrid.com/user/signup) (up to 200 emails per day).

```javascript
{
  "transporter": {
    "service": "SendGrid",
    "auth": {
      "user": "username",
      "pass": "password"
    }
  },
  "email": {
    "from": "John Doe <john.doe@example.com>",
    "subject": "Secret Santa"
  },
  "people": [
    {
      "name": "John Smith",
      "email": "john.smith@example.com"
    },
    {
      "name": "Joe Bloggs",
      "email": "joe.bloggs@example.com"
    }
  ]
}
```
