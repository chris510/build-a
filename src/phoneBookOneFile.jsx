import {
    useReducer,
    createContext,
    useContext,
    useState,
} from 'react';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

const PhoneBookContext = createContext({
    users: [],
    setUsers: () => {},
})

const PhoneBookProvider = ({ children }) => {
    const [users, setUsers] = useState([
        {
            firstName: 'Chris',
            lastName: 'Trinh',
            phone: '9998887777'
        }
    ])
    return (
        <PhoneBookContext.Provider
            value={{
                users,
                setUsers,
            }}
        >
            {children}
        </PhoneBookContext.Provider>
    )
}

const InformationTable = () => {
    const { users } = useContext(PhoneBookContext);
  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ firstName, lastName, phone}, idx) => (
          <tr key={idx}>
            <th style={style.tableCell}>{firstName}</th>
            <th style={style.tableCell}>{lastName}</th>
            <th style={style.tableCell}>{phone}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const CHANGE_FIELD = Symbol('CHANGE_FIELD')
const RESET = Symbol('CHANGE_FIELD')
const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';
const PHONE = 'phone';

const PhoneBookEntryInitialState = {
  [FIRST_NAME]: '',
  [LAST_NAME]: '',
  [PHONE]: '',
}

const PhoneBookEntryReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
    case RESET:
		default:
			return PhoneBookEntryInitialState;
  }
}

const PhoneBookForm = () => {
  const [state, dispatch] = useReducer(PhoneBookEntryReducer, PhoneBookEntryInitialState);
  const { firstName, lastName, phone } = state;
  const { users, setUsers } = useContext(PhoneBookContext);
  console.log(firstName);
  const isAllEntriesFilled = Boolean(firstName) && Boolean(lastName) && Boolean(phone);
  const handleFieldOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case FIRST_NAME:
      case LAST_NAME:
      case PHONE:
        dispatch({
          type: CHANGE_FIELD,
          payload: { key: name, value: value}
        })
        break;
        default:
          throw new Error('Something is wrong with the input')
    }
  }
  return (
    <form onSubmit={e => { e.preventDefault() }} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className={FIRST_NAME}
        name={FIRST_NAME}
        onChange={(e) => handleFieldOnChange(e)}
        value={firstName}
        type='text'
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className={LAST_NAME}
        name={LAST_NAME}
        onChange={(e) => handleFieldOnChange(e)}
        value={lastName}
        type='text'
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className={PHONE}
        name={PHONE}
        onChange={(e) => handleFieldOnChange(e)}
        value={phone}
        type='text'
      />
      <br/>
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
        value='Add User'
        disabled={!isAllEntriesFilled}
        onClick={() => {
          setUsers([state, ...users])
          dispatch({ type: RESET })
        }}
      />
    </form>
  )
}

const PhoneBook = () => {
  return (
      <section>
        <PhoneBookProvider>
            <PhoneBookForm />
            <InformationTable />
        </PhoneBookProvider>
      </section>
  );
}

export default PhoneBook;