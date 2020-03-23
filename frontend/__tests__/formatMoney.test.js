import formatMoney from "../lib/formatMoney";

describe("formatMoney function", () => {
  // Format different than the one on the vids, change tests accordingly
  it.skip("works with fractional dollars", () => {
    expect(formatMoney(1)).toEqual("$1.00");
    expect(formatMoney(10)).toEqual("$10.00");
    expect(formatMoney(9)).toEqual("$9.00");
    expect(formatMoney(40)).toEqual("$40.00");
  });
});
