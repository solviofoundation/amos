import {
  React, hooks,
  Input, AmosChat
} from 'common'
import top from './top.sc'

// const messages = [
//   `👋 I'm Amos. I was created to be 'the best learning mentor in the world'.`,
//   `For now I'm trying to sort the web's learning resources. Then in the future I'll be able to show you learning paths on any topic, tailored to your requirements.`,
//   `So I need your help! Create an account and submit reviews for your favorite learning resources. Vamos, amigo! 🤗`,
// ]

const messages = [
  `👋 I'm Amos. I lived in the 1600s and was a reformer of education. 😎 I'm back to teach you anything you want!`,
  `So, Watcha interested in? 🤗`
]

const Guest = ({onEnt, results, register, onSubmit, ...rest}) => (
  <form css={top} autocomplete='off' onSubmit={onSubmit}>
    <AmosChat avatar='regular'>
      {messages}
    </AmosChat>
    <Input
      name='str'
      link={true}
      onEnt={onEnt}
      results={results}
      ref={register}
      {...rest}
    />
  </form>
)

export default hooks.withSearch (Guest)


// const Guest = ({...rest}) => {
//   const [input, setInputObj] = useState (``)
//   const {data} = useQuery (QUERY_SEARCH, {variables: {string: input}})
//   const setInput = ({target: {value: val}}) => setInputObj (val)

//   /* If data is undefined or input is empty, return null */
//   const results = data
//     ? (R.isEmpty (input)
//       ? null
//       // : R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
//       : R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
//     ) : null

//   const handleSearch = navto (`/t/${input}`)

//   return (
//     <Input
//       onChange={setInput}
//       onEnt={handleSearch}
//       results={results}
//       {...rest}
//     />
//   )
// }

// <Top_ columns={'two'} {...rest}>
//   <AmosChat avatar={'large'}>
//     {messages}
//   </AmosChat>
//   <AuthBox/>
// </Top_>