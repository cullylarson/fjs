export function compose(...fns) {
    return fns.reduce((f, g) => (...args) => f(g(...args)))
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

// works on arrays and objects
export const map = curry((f, x) => {
    const mapObj = (f, obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = f(obj[key], key)
            return acc
        }, {})
    }

    return Array.isArray(x)
        ? x.map(f)
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

export const replace = curry((find, replace, x) => x.replace(find, replace))
export const replaceAll = curry((find, replace, x) => x.replace(new RegExp(find, 'g'), replace))

export const toLower = x => x.toLowerCase()
export const toUpper = x => x.toUpperCase()

export const toBool = x => !!x
export const toString = x => x === null || x === undefined ? '' : '' + x

export const isString = x => typeof x === 'string' || x instanceof String
export const isObject = x => x !== null && typeof x === 'object'
export const isFunction = x => x && {}.toString.call(x) === '[object Function]'
export const isNumeric = x => !isNaN(parseFloat(x)) && isFinite(x)
