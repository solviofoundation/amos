import {R} from 'common'
import {importContext} from './generic'

/* Matches "everything" except ./index.js */
export default require.context (`.`, true, /\.\/(?!index).+\.js/)
  |> importContext
  |> R.mergeAll