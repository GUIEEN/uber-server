import dotenv from 'dotenv'

switch (process.env.NODE_ENV) {
  case 'production':
    dotenv.config({
      path: 'production.env'
    })
    break
  case 'test':
    dotenv.config({
      path: 'test.env'
    })
    break
  default:
    dotenv.config()
}

export default {
  db: {
    endpoint: process.env.DB_ENDPOINT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  sms: {
    twilioAccount: process.env.TWILIO_ACCOUNT_ID,
    twilioToken: process.env.TWILIO_TOKEN,
    twilioPhone: process.env.TWILIO_PHONE
  }
}
