import { Platform, Linking } from 'react-native' // eslint-disable-line

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function launchURL(url, urlEncode) {
  const supported = await Linking.canOpenURL(url)
  const supportedEncode = await Linking.canOpenURL(urlEncode)

  if (!supported && !supportedEncode) {
    return Promise.reject(new Error('Provided URL can not be handled')) // eslint-disable-line
  }

  if (supported) return Linking.openURL(url)
  return Linking.openURL(urlEncode)
}

function sms(phone = '', body = '') {
  assert(typeof phone === 'string', 'Phone number should be a string')
  assert(typeof body === 'string', 'Body should be a string')

  const sep = Platform.OS === 'ios' ? '&' : '?'
  const url = `sms:${phone}${
    body ? `${sep}body=${body}` : ''
  }`
  const urlEncode = `sms:${phone}${
    body ? `${sep}body=${encodeURIComponent(body)}` : ''
  }`

  return launchURL(url, urlEncode)
}

export default sms
