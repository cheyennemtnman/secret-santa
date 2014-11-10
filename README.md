# secret-santa

Given a list of names and email addresses, this Node.js module takes the hassle out of working out secret santa recipients. Run the module, and it'll email everyone with their gift recipient.

It also ensures that no-one receives themselves as a recipient, and that no recipient has more than one "secret santa". Plus, it's hidden from everyone else!

## Usage

Firstly, install the dependencies:

    npm install

Then, create a `config.json` file in the root of the project and populate it with your configuration options (details below). The module uses [Nodemailer](http://www.nodemailer.com/) and supports all major email services (a list of well-known services can be found [here](https://github.com/andris9/nodemailer-wellknown#supported-services)).

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
Once you have your `config.json` file populated, simply run `node index.js`.

:santa:
