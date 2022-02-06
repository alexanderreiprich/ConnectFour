"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../classes/User");
describe("This is a test for username length", () => {
    test("Check the length of the username", () => {
        expect((0, User_1.isUsername)("testUsername")).toBe(true);
        expect((0, User_1.isUsername)("a")).toBe(false);
        expect((0, User_1.isUsername)("123")).toBe(true);
    });
});
//# sourceMappingURL=CheckUserName.test.js.map