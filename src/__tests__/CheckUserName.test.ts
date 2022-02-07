const user = require("../classes/User");

describe("This is a test for username length", () => {
  test("Check the length of the username", () => {
    expect(user.isUsername("testUsername")).toBe(true);
    expect(user.isUsername("a")).toBe(false);
    expect(user.isUsername("asdasdasd")).toBe(true);
  })
});