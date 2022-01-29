// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({path: './.env.test'})
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
