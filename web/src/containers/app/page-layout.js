import PageLayout_ from 'components/page-layout'

import {React, gql, useQuery} from 'common'
// import {connect} from 'react-redux'
// import {setIsAuth} from 'store/auth/actions'

// const actions = {
//   login: () => setIsAuth(true),
// }

// export default connect(null, actions)

const GET_AUTH = gql`
  query {
    isAuthenticated @client
  }
`

const PageLayout = ({...rest}) => {
  const

  {data} = useQuery (GET_AUTH)
  data |> console.log ('data pageLayout', #)

  return (
    <PageLayout_ {...data} {...rest}/>
  )
}

export default (PageLayout)
