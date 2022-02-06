import { isUsername } from "../classes/User";

describe("This is a test for username length", () => {
  test("Check the length of the username", () => {
    expect(isUsername("testUsername")).toBe(true);
    expect(isUsername("a")).toBe(false);
    expect(isUsername("123")).toBe(true);
  })
});