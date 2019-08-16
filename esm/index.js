export function compose(...fns) {
    return fns.reduce((f, g) => (...args) => f(g(...args)))
}

export function pipe(...fns) {
    return fns.reduce((f, g) => (...args) => g(f(...args)))
}

export function curry(f) {
    const arity = f.length

    return function f1() {
        const args = Array.prototype.slice.call(arguments, 0)

        if (args.length >= arity) {
            return f.apply(null, args)
        }
        else {
            return function f2() {
                const args2 = Array.prototype.slice.call(arguments, 0)
                return f1.apply(null, args.concat(args2))
            }
        }
    }
}

export const report = x => { console.log(x); return x }

export const reportM = curry((msg, x) => { console.log(msg, x); return x })

export const liftA = (x) => Array.isArray(x) ? x : [x]

export function tail(x) {
    return x.slice(1)
}

export function head(x) {
    for(var i in x) return x[i]
}

// works on arrays and objects
export const filter = curry((f, x) => {
    const filterObj = (f, obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            if(f(obj[key], key)) {
                acc[key] = obj[key]
            }

            return acc
        }, {})
    }

    return Array.isArray(x)
        ? x.filter(f)
        : filterObj(f, x)
})

export const has = curry((idx, x) => {
    if(!Array.isArray(x) && (x === null || typeof x !== 'object')) return false

    return Array.isArray(x)
        ? (x[idx] !== void 0)
        : (idx in x)
})

export const get = curry((idx, defaultValue, x) => {
    if(!idx && idx !== 0) return defaultValue
    const path = liftA(idx)
    if(!path.length) return defaultValue

    const getOne = curry((idx, defaultValue, x) => {
        return has(idx, x)
            ? x[idx]
            : defaultValue
    })

    const firstIdx = head(path)
    const theRest = tail(path)

    // we don't have the index
    if(!has(firstIdx, x)) return defaultValue

    return theRest.length
        ? get(theRest, defaultValue, getOne(firstIdx, [], x))
        : getOne(firstIdx, defaultValue, x)
})

export const set = curry((idx, val, x) => {
    const idxArr = liftA(idx)

    return (!idx && idx !== 0) || !idxArr.length
        ? val
        : Object.assign(
            Array.isArray(x) ? [] : {},
            x,
            {[head(idxArr)]: set(tail(idxArr), val, get(head(idxArr), {}, x))}
        )
})

// get the first N items from an array
export const headN = curry((n, x) => x.slice(0, n))

// get the items after the first N (not including the Nth)
export const tailN = curry((n, x) => x.length < n ? [] : x.slice(n))

// works on arrays, plain objects, objects with a map function, fantasyland Functors.
// if x has a map member and it's a function, will use that as the map function.
// if x is a fantasyland Functor, will use its map function.
export const map = curry((f, x) => {
    const mapObj = (f, obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = f(obj[key], key)
            return acc
        }, {})
    }

    return x.map && isFunction(x.map)
        ? x.map(f)
        : x && x['fantasy-land/map']
            ? x['fantasy-land/map'](f)
            : mapObj(f, x)
})

// if xs is an array, will only get values if they're set. if xs is an object, will take key => defaultValue
// and will return object with all keys, using defaultValue if key isn't set.
export const pick = curry((keys, xs) => {
    return Array.isArray(keys)
        ? keys.reduce((acc, key) => {
            return has(key, xs)
                ? set(key, xs[key], acc)
                : acc
        }, {})
        : map((defaultValue, k) => get(k, defaultValue, xs), keys)
})

export const identity = x => x

export const trim = x => ('' + x).trim()

// works on arrays and objects
export const reduce = curry((f, initial, x) => {
    const reduceObj = (f, initial, obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            return f(acc, obj[key], key)
        }, initial)
    }

    return Array.isArray(x)
        ? x.reduce(f, initial)
        : reduceObj(f, initial, x)
})

export const toInt = curry((defaultValue, x) => {
    const val = Number.parseInt(x)

    return isNaN(val)
        ? defaultValue
        : val
})

export const getInt = curry((idx, defaultValue, x) => {
    const value = get(idx, defaultValue, x)

    if(value === defaultValue) return value

    return toInt(defaultValue, value)
})

export const always = x => () => x

export const ifElse = curry((predicate, doIf, doElse, x) => {
    return predicate(x)
        ? doIf(x)
        : doElse(x)
})

// Gets a set of parameters from an object. If parameters don't exist, a provided
// default value will be used. If the parameter does exist, it will be passed through
// the provided filter function. This is useful for getting parameters from user input
// and ensuring that they'll at least exist before using them.
//
// keyDefs looks like: {key: [defaultValue, filterFunction], ...}
// Instead of an array, the keyDef values can be functions. In this case, the value
// will just be passed to the function. If the value doesn't exist, undefined will be used
export const getParams = curry((keyDefs, x) => {
    const keyDefsNormalized = map(def => Array.isArray(def) ? def : [undefined, def], keyDefs)
    const keyToDefaultValue = map(def => def[0], keyDefsNormalized)

    const unfilteredValues = pick(keyToDefaultValue, x)

    return map((value, k) => keyDefsNormalized[k][1](value), unfilteredValues)
})

// Only returns the value if it's in the provided set, otherwise returns the default value. case sensitive. If the provided value is an array, each value must be the validSet or it wll not be included in the result; in this case defaultValue is ignored.
export const clampSet = curry((validSet, defaultValue, x) => {
    if(Array.isArray(x)) {
        return x.reduce((acc, y) => {
            return validSet.includes(y)
                ? [...acc, y]
                : acc
        }, [])
    }
    else {
        return validSet.includes(x)
            ? x
            : defaultValue
    }
})

// Takes a list of keys and an object. Will return an object that has all the original
// keys/values except those provided.
export const omit = curry((keys, x) => filter((_, k) => !keys.includes(k), x))

// return sthe last item in an array
export const last = x => x.slice(-1)[0]

export const values = x => Object.values(x)

export const split = curry((separator, x) => x.split(separator))
export const join = curry((separator, xs) => xs.join(separator))
export const replace = curry((find, replace, x) => x.replace(find, replace))
export const replaceAll = curry((find, replace, x) => x.replace(new RegExp(find, 'g'), replace))

export const toLower = x => x.toLowerCase()
export const toUpper = x => x.toUpperCase()

// Tests if a value is NaN (the actual NaN object, not just "not a number")
// NaN is the only value in JS not equal to itself
export const isNaNResult = x => x !== x // eslint-disable-line no-self-compare

export const toBool = x => !!x
export const toStr = x => x === null || x === undefined || isNaNResult(x) ? '' : '' + x

export const isString = x => typeof x === 'string' || x instanceof String
export const isObject = x => x !== null && typeof x === 'object'
export const isFunction = x => x && {}.toString.call(x) === '[object Function]'
export const isNumeric = x => !isNaN(parseFloat(x)) && isFinite(x)
export const isInt = x => {
    const xInt = parseInt(x)
    const xNumber = Number(x)

    // if x was a float, xInt and xNumber won't be equal
    if(isNaN(xInt) || isNaN(xNumber) || xInt !== xNumber) return false

    return true
}

export const toFloat = curry((defaultValue, x) => {
    const xFloat = parseFloat(x)
    const xNumber = Number(x) // parseFloat will turn things like '3 asdf' into 3, which we don't want

    return isNaN(xFloat) || isNaN(xNumber)
        ? defaultValue
        : xFloat
})
