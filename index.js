export function objectType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export function concatObjects(obj1, obj2) {
  return Object.assign({}, obj1, obj2);
}

export function hasKey(obj, key) {
  return obj.hasOwnProperty(key);
}

export function hasValue(obj, value) {
  return Object.values(obj).includes(value);
}

export function clone(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export async function clone_async(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = await clone_async(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = await clone_async(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getValueFromMap(o, t) {
  if (!o || t === "" || typeof o !== "object") {
    return null;
  }

  const keyArr = t.split(".");
  const firstKey = keyArr[0];
  keyArr.shift();

  if (keyArr.length === 0) {
    return o[firstKey];
  }

  return getValueFromMap(o[firstKey], keyArr.join("."));
}

export function isTheSame(o1, o2, skipFields = []) {
  if ((o1 == null && o2 != null) || (o1 != null && o2 == null)) {
    return false;
  }

  if (typeof o1 !== typeof o2) {
    return false;
  }

  if (Array.isArray(o1) && !Array.isArray(o2)) {
    return false;
  }

  if (typeof o1 === "string") {
    return o1.trim().toLowerCase() === o2.trim().toLowerCase();
  }

  if (Array.isArray(o1)) {
    if (o1.length !== o2.length) {
      return false;
    }
    for (let i = 0; i < o1.length; i++) {
      if (!o2.includes(o1[i])) {
        return false;
      }
    }
    return true;
  }

  if (typeof o1 === "object") {
    if (Object.keys(o1).length !== Object.keys(o2).length) {
      return false;
    }
    for (let key in o1) {
      if (!skipFields.includes(key)) {
        if (
          !o2.hasOwnProperty(key) ||
          !isTheSame(o1[key], o2[key], skipFields)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  return o1 === o2;
}

export function deepEqual(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != "object" || b == null || typeof b != "object")
    return false;

  let keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

export function contains(search, obj) {
  if (deepEqual(obj, search)) return true;
  for (let key in search) {
    if (obj.hasOwnProperty(key)) {
      if (typeof search[key] === "object" && typeof obj[key] === "object") {
        if (!contains(obj[key], search[key])) {
          return false;
        }
      } else if (obj[key] !== search[key]) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

export function sortObjectByKeys(obj) {
  const keys = Object.keys(obj);
  keys.sort((a, b) => {
    // Convert keys to strings and compare their lexicographic order
    return a.toString().localeCompare(b.toString());
  });
  return obj;
}

export function sortObjectByCustomKeys(obj, key) {
  return Object.keys(obj)
    .sort((a, b) => (obj[a][key] > obj[b][key] ? 1 : -1))
    .reduce((acc, curr) => {
      acc[curr] = obj[curr];
      return acc;
    }, {});
}

//pretty print obj
export function prettyPrint(obj) {
  return JSON.stringify(obj, null, 2);
}

export function* iterateObject(d) {
  for (let k of Object.keys(d)) {
    yield [k, d[k]];
  }
}
