/* eslint-disable no-mixed-operators */
const getRandomValues = crypto.getRandomValues.bind(crypto)
const rnds8 = new Uint8Array(16)
const byteToHex = Array.from({ length: 256 }, (_, i) => (i + 256).toString(16).substr(1))
const regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/iu
function stringify_default(arr: Uint8Array) {
  const uuid = `${byteToHex[arr[0]]}${byteToHex[arr[1]]}${byteToHex[arr[2]]}${byteToHex[arr[3]]}-${byteToHex[arr[4]]}${
    byteToHex[arr[5]]
  }-${byteToHex[arr[6]]}${byteToHex[arr[7]]}-${byteToHex[arr[8]]}${byteToHex[arr[9]]}-${byteToHex[arr[10]]}${
    byteToHex[arr[11]]
  }${byteToHex[arr[12]]}${byteToHex[arr[13]]}${byteToHex[arr[14]]}${byteToHex[arr[15]]}`.toLowerCase()
  if (regex_default.test(uuid)) return uuid
  throw TypeError('Stringified UUID is invalid')
}
export function getuuid() {
  const rnds = getRandomValues(rnds8)
  rnds[6] = rnds[6] & 15 | 64
  rnds[8] = rnds[8] & 63 | 128
  return stringify_default(rnds)
}
