import { useContext, useReducer } from 'react';
import { style } from './phonebook.style';
import { PhoneBookContext } from './phonebook.provider';

const initialState = {
	firstName: '',
	lastName: '',
	phone: '',
}

const CHANGE_FIELD = Symbol('CHANGE_FIELD')
const RESET = Symbol('CHANGE_FIELD')
const USER_FIRST_NAME = 'userFirstName';
const USER_LAST_NAME = 'userLastName';
const USER_PHONE = 'userPhone';

const phoneBookMap = {
    [USER_FIRST_NAME]: 'firstName',
    [USER_LAST_NAME]: 'lastName',
    [USER_PHONE]: 'phone'
};

const PhoneBookFormReducer = (state, action) => {
	switch (action.type) {
		case CHANGE_FIELD:
			return {
				...state,
				[action.payload.key]: action.payload.value,
			}
		case RESET:
			return initialState;
		default:
			return initialState
	}
}

const PhoneBookForm = () => {
	const [state, dispatch] = useReducer(PhoneBookFormReducer, initialState);
	const { firstName, lastName, phone } = state;
	const { users, setUsers } = useContext(PhoneBookContext)

	const isAllEntriesFilled = Boolean(firstName) && Boolean(lastName) && Boolean(phone);

	const handleFieldChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		switch (name) {
			case USER_FIRST_NAME:
			case USER_LAST_NAME:
			case USER_PHONE:
				dispatch({
					type: CHANGE_FIELD,
					payload: { key: phoneBookMap[name], value}
				});
				break;
			default:
				throw new Error ('Something is wrong with the user input');
		}
	}

	const handleAddEntry = () => {
		const newEntry = {
			firstName,
			lastName,
			phone
		}
		setUsers([...users, newEntry])
	}

  	return (
		<form onSubmit={e => { e.preventDefault() }} style={style.form.container}>
		<label>First name:</label>
		<br />
		<input
			style={style.form.inputs}
			onChange={(e) => handleFieldChange(e)}
			className={USER_FIRST_NAME}
			name={USER_FIRST_NAME}
			type='text'
		/>
		<br/>
		<label>Last name:</label>
		<br />
		<input
			style={style.form.inputs}
			onChange={(e) => handleFieldChange(e)}
			className={USER_LAST_NAME}
			name={USER_LAST_NAME}
			type='text'
		/>
		<br />
		<label>Phone:</label>
		<br />
		<input
			style={style.form.inputs}
			onChange={(e) => handleFieldChange(e)}
			className={USER_PHONE}
			name={USER_PHONE}
			type='text'
		/>
		<br/>
		<input
			style={style.form.submitBtn}
			className='submitButton'
			type='submit'
			value='Add User'
			disabled={!isAllEntriesFilled}
			onClick={() => handleAddEntry()}
		/>
		</form>
	)
}

export default PhoneBookForm;