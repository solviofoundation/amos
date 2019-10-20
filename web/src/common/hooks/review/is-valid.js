import {R, H, React, CONST} from 'common'

const VALIDATE = [`next`, `finish`]
const DONT_VALIDATE = [`previous`]

const setErrors = form => fields => () => R.map (field => form.setError (field, ``, CONST.err_topics)) (fields)

const isValid = (props) => {

  const

  {results, loading, form} = props,
  [valid, setValid] = React.useState ([]),

  // [] = [topics |> console.log ('topics is-valid.js', #)],

  /* eslint-disable no-shadow */
  setOneValid = key => isValid => {
    setValid (H.update (key) (isValid) (valid))
  },

  createOnChange = (fn, key) => _results => (e) => {
    const {target: {value}} = e,
    res = results.topics[key],
    /* to be valid, value must be among results */
    isValid = res && (!loading) && R.includes (value) (R.pluck (`text`) (res))
    /* Set validity in state */
    isValid ? setOneValid (key) (true) : setOneValid (key) (false)
    /* In any case run parent (which updates queryConfig) */
    fn (_results) (e)
  },

  onChange = H.map (createOnChange) (props.onChange),

  topics = form.watch (`topic`, []),
  
  // TODO: generalize
  getInvalidField = (acc, val, i) => {
    const test = !val && H.isNotNilOrEmpty (topics[i])
    return test ? R.append (`topic[${i}]`) (acc) : acc
  },
  invalidFields = H.reduce (getInvalidField) ([]) (valid),

  [] = [invalidFields |> console.log ('invalidFields', #)],
  
  // isAllValid = R.all (R.identity) (isValid),
  isAllValid = R.length (invalidFields) === 0,

  [] = [form.formState.isSubmitted && (() => {
    isAllValid
      ? R.not (form.formState.isValid) && form.clearError ()
      : setErrors (form) (invalidFields)
  })()],

  _addValidation = cb => (
    isAllValid
      ? cb
      : form.handleSubmit (setErrors (form) (invalidFields))
  ),

  // validate = R.pipe (
  //   R.pick (VALIDATE),
  //   R.map 
  // ) (props.onSubmit)
  
  // onSubmit = R.merge (validate) (dontValidate)

  // onSubmit = R.converge (
  //   R.merge,
  //   [R.pipe , ]
  // )

  onSubmit = R.map (_addValidation) (props.onSubmit)

  /* Override onChange and onSubmit */
  return R.mergeAll ([{valid, setOneValid, setValid}, props, {onChange, onSubmit}])
}

export default isValid