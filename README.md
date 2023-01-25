### Object Utils

A collection of utility functions for working with JavaScript objects.

#### Installation

`npm install jsobjutils`

#### Usage

```javascript
import {
  objectType,
  concatObjects,
  hasKey,
  hasValue,
  clone,
  clone_async,
  isObjectEmpty,
  getValueFromMap,
  isTheSame,
} from "jscommonregex";
```

#### API

##### objectType(obj: any)

Returns a string representation of the object's type (e.g. 'Object', 'Array', 'String', etc.).

##### concatObjects(obj1: Object, obj2: Object)

Returns a new object that is the result of merging obj2 into obj1.

##### hasKey(obj: Object, key: string | number)

Returns a boolean indicating whether the object has the specified key.

##### hasValue(obj: Object, value: any)

Returns a boolean indicating whether the object has the specified value.

##### clone(obj: any)

Returns a deep copy of the object.

##### clone_async(obj: any)

Returns a deep copy of the object.

##### isObjectEmpty(obj: Object)

Returns a boolean indicating whether the object is empty.

##### getValueFromMap(o: Object, t: string)

Returns the value of the object from the provided key path.

##### isTheSame(o1: any, o2: any, skipFields: Array<string> = [])

Returns a boolean indicating whether the two objects are the same.
