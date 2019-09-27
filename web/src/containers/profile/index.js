import {
  React,
  AmosChat, Button
} from 'common'
import Top_ from './top.sc'
import connect from './connect'

const messages = [
  `Unfortunately I can't show your profile just yet.`,
  `Don't leave there's work to do 🧐`
]

const Profile = ({logout}) => (
  <Top_>
    <AmosChat callToAction={
      <Button primary onClick={logout}>
        Logout
      </Button>}>
      {messages}
    </AmosChat>
  </Top_>
)

export default connect(Profile)
