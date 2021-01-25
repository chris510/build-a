import { shallow } from 'enzyme';
import App from './App';

describe('First React component test with Enzyme', () => {
    it('renders without crashing', () => {
       shallow(<App />);
     });
 });