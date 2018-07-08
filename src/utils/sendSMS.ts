import Twilio from 'twilio'
import configuration from '../configuration'

const twilioClient = Twilio(
  configuration.sms.twilioAccount,
  configuration.sms.twilioToken
)

export const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body,
    to,
    from: configuration.sms.twilioPhone
  })
}

export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is: ${key}`)
