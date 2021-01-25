import Button from './button';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('Button Component', () => {
    it('component renders', () => {
        const comp = shallow(<Button />)

        expect(comp.exists()).toBe(true);
    })

    // it('button text is echoed', () => {
    //     const mockCallBack = jest.fn();
    //     const comp = shallow(<Button handleOnClick={() => mockCallBack}>9</Button>);

    //     comp.find('button').props().onClick()
    //     expect(mockCallBack.mock.calls.length).toEqual(1);

    // })
})