Reflect.defineProperty(Set.prototype, 'toJSON', {
  configurable: false,
  enumerable: false,
  value: function toJSON(this: Set<any>) {
    return [...this]
  },
  writable: false
})
