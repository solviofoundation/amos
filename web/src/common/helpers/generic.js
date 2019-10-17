import * as R from 'ramda'

export const

/**
 * @description Universal lens
 * @param path
 * @param obj
 */
lens = R.cond ([
  [R.is (String), R.lensProp],
  [R.is (Number), R.lensIndex],
  [R.T, R.lensPath]
]),

set = R.curry ((path, val, obj) => R.set (lens (path, obj), val, obj)),

over = R.curry ((path, cb, obj) => R.over (lens (path, obj), cb, obj)),

ifProp = (prop, a, b) => R.ifElse(
  R.propEq(prop, true),
  R.always(a),
  R.always(b),
),

prop = (name, defValue) => R.ifElse(
  R.has(name),
  R.prop(name),
  R.always(defValue),
),

/**
 * @description Tests whether function is not `null` or `undefined`
 * @param val
 */

notEquals = R.complement (R.equals),

isNotNil = R.complement (R.isNil),
isNotEmpty = R.complement (R.isEmpty),

isNilOrEmpty = R.either (R.isNil) (R.isEmpty),
isNotNilOrEmpty = R.both (isNotNil, isNotEmpty),


/**
 * @description Like R.map but you get (val, key)!
 * @param cb
 * @param obj
 */
mapIndexed = R.addIndex (R.map),

/**
 * @description Apply two functions and return result of the second
 * @param Arb Arbitrary number of params
 */

intercept = cb => fn => R.converge (R.nthArg (0)) ([fn, cb]),

/**
 * @description Wrap any function with debug to log its arguments
 * @param Arb Arbitrary number of params
 */
debug = intercept (console.log),
mapIfNotNil = fn => obj => (
  R.isNil (obj)
    ? null
    : R.map (fn) (obj)
),

getMessages = def => R.pipe (
  R.values,
  R.pluck (`message`),
  R.flatten,
  R.when (
    R.isEmpty,
    R.append (def),
  )
),

importContext = req => {
  const cache = R.reduce ((acc, key) => R.append (req (key)) (acc)) ([]) (req.keys())
  /* Accept default exports */
  const _cache = R.map (val => R.propOr (val) (`default`) (val)) (cache)
  /* Wrap defaultly exported functions in an object */
  return R.map (R.when (fn => fn instanceof Function) (fn => ({[fn.name]: fn}))) (_cache)
}