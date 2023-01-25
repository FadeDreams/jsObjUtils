/* eslint-disable */
import * as jsobjutils from "./index.js";

test("jscommonregex", () => {
  expect(jsobjutils.objectType({})).toBe("Object");
  expect(jsobjutils.objectType([])).toBe("Array");
  expect(jsobjutils.objectType("")).toBe("String");
  expect(jsobjutils.objectType(1)).toBe("Number");
  expect(jsobjutils.objectType(true)).toBe("Boolean");
  expect(jsobjutils.objectType(null)).toBe("Null");
  expect(jsobjutils.objectType(undefined)).toBe("Undefined");
  expect(jsobjutils.objectType(() => {})).toBe("Function");
  expect(jsobjutils.objectType(new Date())).toBe("Date");
  expect(jsobjutils.objectType(new RegExp())).toBe("RegExp");
  expect(jsobjutils.objectType(new Error())).toBe("Error");
  expect(jsobjutils.objectType(new Map())).toBe("Map");
  expect(jsobjutils.objectType(new Set())).toBe("Set");
  expect(jsobjutils.objectType(new WeakMap())).toBe("WeakMap");
  expect(jsobjutils.objectType(new WeakSet())).toBe("WeakSet");
  expect(jsobjutils.objectType(new ArrayBuffer())).toBe("ArrayBuffer");
  expect(jsobjutils.objectType(new DataView(new ArrayBuffer()))).toBe(
    "DataView"
  );
  expect(jsobjutils.objectType(new Int8Array())).toBe("Int8Array");
  expect(jsobjutils.objectType(new Uint8Array())).toBe("Uint8Array");
  expect(jsobjutils.objectType(new Uint8ClampedArray())).toBe(
    "Uint8ClampedArray"
  );
  expect(jsobjutils.objectType(new Int16Array())).toBe("Int16Array");
  expect(jsobjutils.objectType(new Uint16Array())).toBe("Uint16Array");
  expect(jsobjutils.objectType(new Int32Array())).toBe("Int32Array");
  expect(jsobjutils.objectType(new Uint32Array())).toBe("Uint32Array");
  expect(jsobjutils.objectType(new Float32Array())).toBe("Float32Array");
  expect(jsobjutils.objectType(new Float64Array())).toBe("Float64Array");
  expect(jsobjutils.objectType(new BigInt64Array())).toBe("BigInt64Array");
  expect(jsobjutils.objectType(new BigUint64Array())).toBe("BigUint64Array");
  expect(jsobjutils.objectType(new Promise(() => {}))).toBe("Promise");
  expect(jsobjutils.objectType(Symbol())).toBe("Symbol");

  expect(jsobjutils.concatObjects({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });

  expect(jsobjutils.hasKey({ a: 1 }, "a")).toBe(true);
  expect(jsobjutils.hasKey({ a: 1 }, "b")).toBe(false);

  expect(jsobjutils.hasValue({ a: 1 }, 1)).toBe(true);
  expect(jsobjutils.hasValue({ a: 1 }, 2)).toBe(false);

  expect(jsobjutils.clone({ a: 1 })).toEqual({ a: 1 });
  expect(jsobjutils.clone({ a: 1, b: { c: 2 } })).toEqual({
    a: 1,
    b: { c: 2 },
  });

  expect(jsobjutils.clone_async({ a: 1 })).resolves.toEqual({ a: 1 });
  expect(jsobjutils.clone_async({ a: 1, b: { c: 2 } })).resolves.toEqual({
    a: 1,
    b: { c: 2 },
  });

  expect(jsobjutils.isObjectEmpty({})).toBe(true);
  expect(jsobjutils.isObjectEmpty({ a: 1 })).toBe(false);

  expect(jsobjutils.getValueFromMap({ a: 1 }, "a")).toBe(1);
  expect(jsobjutils.getValueFromMap({ a: 1 }, "b")).toBe(undefined);

  expect(jsobjutils.isTheSame({ a: 1 }, { a: 1 })).toBe(true);
  expect(jsobjutils.isTheSame({ a: 1 }, { a: 2 })).toBe(false);

  expect(jsobjutils.deepEqual({ a: 1 }, { a: 1 })).toBe(true);
  expect(jsobjutils.deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  expect(jsobjutils.deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  expect(jsobjutils.deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  expect(jsobjutils.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  expect(jsobjutils.deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  expect(jsobjutils.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(
    false
  );
  expect(jsobjutils.deepEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(
    false
  );

  expect(jsobjutils.contains({ a: 1 }, { a: 1 })).toBe(true);
  expect(jsobjutils.contains({ a: 1 }, { a: 2 })).toBe(false);
  expect(jsobjutils.contains({ a: 1 }, { a: 1, b: 2 })).toBe(true);
  expect(jsobjutils.contains({ a: 1, b: 2 }, { a: 1 })).toBe(false);

  expect(jsobjutils.sortObjectByKeys({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  expect(jsobjutils.sortObjectByKeys({ b: 2, a: 1 })).toEqual({ a: 1, b: 2 });

  expect(jsobjutils.sortObjectByCustomKeys({ a: 1, b: 2 }, ["b", "a"])).toEqual(
    { b: 2, a: 1 }
  );
  expect(jsobjutils.sortObjectByCustomKeys({ b: 2, a: 1 }, ["a", "b"])).toEqual(
    { a: 1, b: 2 }
  );

  const iterator = jsobjutils.iterateObject({
    key1: "value1",
    key2: "value2",
    key3: "value3",
  });
  const result = [...iterator];
  const expectedResult = [
    ["key1", "value1"],
    ["key2", "value2"],
    ["key3", "value3"],
  ];

  expect(result).toEqual(expectedResult);
});
