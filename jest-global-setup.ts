import {config} from 'dotenv'

export default () => {
  console.log('Setting globals...')

  config({path: './.env.test'})

  console.log('Globals set!')
}
