import * as R from 'ramda'
import fs from 'fs'
import path from 'path'

export const 

read = dir => file => fs.readFileSync (path.join (dir, file), {encoding: `utf8`}),

mergeDeepAll = R.reduce (R.mergeDeepRight) ({}),

/**
 * @description 
 * @example 
 */
assert = pr => st => {
  pr
    ? null
    : throw new Error (st)
},

neq = R.complement (R.equals),

isNotNil = R.complement (R.isNil),
isNotEmpty = R.complement (R.isEmpty),

isNilOrEmpty = R.either (R.isNil) (R.isEmpty),
isNotNilOrEmpty = R.both (isNotNil, isNotEmpty),

/**
 * @description Turns an array of named functions to object with keys corresponding to those names
 * @param {Array} - array of fns
 */
arrayOfFnsToObject = R.reduce ((acc, val) => R.set (R.lensProp (val.name)) (val) (acc)) ({}),

// mergeDeepWithKeyAll = 

id = R.identity,

log = p => {console.log(`p`, p); return p},

ls = rec => dirBase => dir => regExp => R.map (R.pipe (
  f => dir + `/` + f,
  relPath => fs.lstatSync (path.join (dirBase, relPath)).isDirectory() ? ls (rec) (dirBase) (relPath) (regExp) : R.test (regExp) (relPath) ? relPath : null
)) (fs.readdirSync (path.join (dirBase, dir)))
|> R.flatten
|> R.reject (R.isNil) (#),

requireContext = dirAbs => key => require (path.resolve (dirAbs, key)),

context = dirBase => dirRel => regExp => {
  const

  dirAbs = path.resolve (dirBase, dirRel),
  keys = ls (true) (dirAbs) (`.`) (regExp)

  const _requireContext = requireContext (dirAbs)
  _requireContext.keys = () => keys

  return _requireContext
},
defOpts = {def: true, other: true, parent: false},

_importContext = _opts => req => {
  const opts = R.merge (defOpts) (_opts)
  const toReturn = R.reduce ((acc, key) => {
    const name = R.pipe (
      /* Get file name */
      R.split (`/`), R.last,
      /* Drop extension */
      R.split (`.`), R.head
    ) (key)
    const exports = req (key)
    const def = 
      opts.def && R.has (`default`) (exports)
        ? {[name]: exports.default}
        : {}
    const other =
      opts.other
        ? R.omit ([`default`]) (exports)
        : {}
    const _res = R.mergeDeepRight (other) (def)
    const res =
      opts.parent
        ? do {
          const parent = R.pipe (R.split (`/`), R.nth (-2)) (key)
          const o = {[parent]: _res}
          o
        }
        : _res
    return R.mergeDeepRight (acc) (res)
  }) ({}) (req.keys())
  return toReturn
},

importContext = _importContext (defOpts),

_req = opts => R.curryN (3) (R.pipe (R.uncurryN (3) (context), _importContext (opts))),

req = _req (defOpts),

reqResolvers = dirBase => (
  context (dirBase) (`.`) (/\.\/.+\/.+\/.+\.js$/)
    |> _importContext ({other: false, parent: true}) (#)
),

reqAll = dirBase => (
  context (dirBase) (`.`) (/\.\/(?!index).+\.js/)
    |> importContext
),

wrapInResponse = fn => {
  const _fn = async (...args) => {
    try {
      const _result = await fn (...args),
      /* If message is undefined set it to null (otherwise GraphQL complains) */
      result = R.over (R.lensProp (`message`)) (m => m || null) (_result)
      return R.merge (result) ({success: true})
    // } catch (e) {
    } catch ({message: _message, errors: message = [_message]}) {
      return {success: false, message}
    }
  }
  /* Name function */
  Object.defineProperty (_fn, `name`, R.objOf (`value`) (fn.name))
  return _fn
},

lens = R.cond ([
  [R.is (String), R.lensProp],
  [R.is (Number), R.lensIndex],
  [R.T, R.lensPath]
]),

set = R.curry ((path, val, obj) => R.set (lens (path, obj), val, obj)),

over = R.curry ((path, cb, obj) => R.over (lens (path, obj), cb, obj))

// getOne = async (cypher, _, params, {session}) => {
//   const {records: recs} = await session.run (cypher, params)

//   const toReturn = R.nth (0) (R.map (rec => rec.get (`t`).properties) (recs))
//   toReturn |> console.log ('toReturn', #)
//   return toReturn
// }