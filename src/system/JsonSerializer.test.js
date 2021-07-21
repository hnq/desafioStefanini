const { Serializable, Attribute } = require("./JsonSerializer")

describe('JsonSerializer', () => {
  it('Serializable should be definied', () => {
    const fun = Serializable();
    expect(fun).toBeDefined();
  })
  it('Attribute should be definied', () => {
    const fun = Attribute();
    expect(fun).toBeDefined();
  })
})