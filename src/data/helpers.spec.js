import Pair from "crocks/Pair";
import State from "crocks/State";
import type from "crocks/core/type";
import isFunction from "crocks/predicates/isFunction";
import { matcherHint } from "jest-matcher-utils";
import { isObjValueSameType, slice, popLastSlide } from "./helpers";

const sampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

expect.extend({
  toReturnType(received, typeToMatch) {
    if (!isFunction(received))
      throw new Error(
        `expect(Function).toReturnType(Type)\n\nReceived value must be a function but ${type(
          received
        )} was given.`
      );

    const result = received();
    const message =
      matcherHint(".toReturnType") +
      "\n\n" +
      `Expected returned type to be: \n"${type(typeToMatch)}"\n` +
      `Received type: \n"${type(result)}"`;

    return {
      message,
      pass: type(result) === type(typeToMatch)
    };
  }
});

describe("isObjValueSameType()", () => {
  const sampleObj = {
    val1: 1,
    val2: "Hello",
    val3: () => "Wazup",
    val4: Pair(1, 2),
    val5: true
  };

  const curried = isObjValueSameType(sampleObj);

  test("Must return false when the value is not of the same type", () => {
    expect(curried("val1", "World")).toBe(false);
    expect(curried("val2", () => "nothing")).toBe(false);
    expect(curried("val3", 2)).toBe(false);
    expect(curried("val4", {})).toBe(false);
    expect(curried("val4", 300)).toBe(false);
  });

  test("Must return true when the values are the same type", () => {
    expect(curried("val1", 2)).toBe(true);
    expect(curried("val2", "World")).toBe(true);
    expect(
      curried("val3", function() {
        return null;
      })
    ).toBe(true);
    expect(curried("val4", Pair("Hello", 2))).toBe(true);
    expect(curried("val5", false)).toBe(true);
  });

  test("Must return false when the key doesn't exist in the object", () => {
    expect(curried("noKey", 10)).toBe(false);
    expect(curried("noKey", undefined)).toBe(false);
    expect(curried("noKey", null)).toBe(false);
  });
});

describe("slice()", () => {
  test("It should be a curried function", () => {
    expect(slice()).toBeInstanceOf(Function);
    expect(slice(0)).toBeInstanceOf(Function);
    expect(slice(0, 2)).toBeInstanceOf(Function);
    expect(slice(0, 2, sampleArray)).toHaveLength(2);
  });

  test("It should throw a TypeError when starting index is not a number", () => {
    const sliceTest = x => () => slice(x, 2, []);
    const errorMsg = "slice(): The first argument must be a Number";
    expect(sliceTest({})).toThrowError(errorMsg);
    expect(sliceTest(null)).toThrowError(errorMsg);
    expect(sliceTest(undefined)).toThrowError(errorMsg);
    expect(sliceTest([1, 2, 3])).toThrowError(errorMsg);
    expect(sliceTest(() => null)).toThrowError(errorMsg);
    expect(sliceTest(1)).not.toThrow();
  });

  test("It should throw a TypeError when ending index is not a number", () => {
    const sliceTest = x => () => slice(0, x, []);
    const errorMsg = "slice(): The second argument must be a Number";
    expect(sliceTest({})).toThrowError(errorMsg);
    expect(sliceTest(null)).toThrowError(errorMsg);
    expect(sliceTest(undefined)).toThrowError(errorMsg);
    expect(sliceTest([1, 2, 3])).toThrowError(errorMsg);
    expect(sliceTest(() => null)).toThrowError(errorMsg);
    expect(sliceTest(1)).not.toThrow();
  });

  test("It should throw a TypeError when provided list is not an array", () => {
    const sliceTest = x => () => slice(0, 2, x);
    const errorMsg = "slice(): The third argument must be an Array";
    expect(sliceTest({})).toThrowError(errorMsg);
    expect(sliceTest(null)).toThrowError(errorMsg);
    expect(sliceTest(undefined)).toThrowError(errorMsg);
    expect(sliceTest(123)).toThrowError(errorMsg);
    expect(sliceTest(() => null)).toThrowError(errorMsg);
    expect(sliceTest([])).not.toThrow();
  });

  test("It should take the first 2 items in the array", () => {
    expect(slice(0, 2, sampleArray)).toHaveLength(2);
  });
});

describe("popLastSlide()", () => {
  test("It should return a State ADT", () => {
    expect(popLastSlide).toReturnType(State);
  });
  test("It should place the last item from the slides array into the resultant and remove it from the state portion", () => {
    const sampleState = { slides: [{}, {}, {}, { name: "LastSlide" }] };
    const result = popLastSlide().runWith(sampleState);
    expect(result.fst()).toHaveProperty("name", "LastSlide");
    expect(result.snd().slides).toHaveLength(3);
  });
  test("It should have an empty object in the resultant when there is no slides in the state", () => {
    const result = popLastSlide().runWith({});
    expect(result.fst()).toEqual({});
  });
  test("It should not set a slides property in the state when there is no slides to begin with", () => {
    const result = popLastSlide().runWith({});
    expect(result.snd()).not.toHaveProperty("slides");
  });
});
