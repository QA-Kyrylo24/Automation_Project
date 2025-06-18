import { test, expect } from '@playwright/test';

test.describe("Passing tests @S10fc3512", () => {
  test("Passing test #1 @Tee2fd6c7", () => expect(true).toBeTruthy());
  test("Passing test #2 @T77edeac6", () => expect(true).toBeTruthy());
  test("Passing test #3 @Tb10104fb", () => expect(true).toBeTruthy());
  test("Passing test #4 @T680149ee", () => expect(true).toBeTruthy());
  test("Passing test #5 @Tf2968eba", () => expect(true).toBeTruthy());
});

test.describe("Flaky tests", () => {
  const rollTheDice = () => Math.round(1 + Math.random() * 5);

  test("Flaky test #1 @T73a98040", () => expect(rollTheDice()).toBeGreaterThan(2));
  test("Flaky test #2 @T51fea949", () => expect(rollTheDice()).toBeGreaterThan(2));
  test("Flaky test #3 @T923338b5", () => expect(rollTheDice()).toBeGreaterThan(2));
  test("Flaky test #4 @T5394c8ee", () => expect(rollTheDice()).toBeGreaterThan(2));
  test("Flaky test #5 @Td64533b3", () => expect(rollTheDice()).toBeGreaterThan(2));
  test("Flaky test #6 @Tf8e35f76", () => expect(rollTheDice()).toBeGreaterThan(2));
});

test.describe("Failing tests", () => {
  test("Failing test #1 @T9e97cebf", () => expect(false).toBeTruthy());
  test("Failing test #2 @T88fca27f", () => expect(null).toBeTruthy());
});

test.describe("Skipped tests", () => {
  test.skip("We don't need this test", () => expect(true).toBeTruthy());
  test.skip("...and this one as well", () => expect(false).toBeTruthy());
});