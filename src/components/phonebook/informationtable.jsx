import { useContext } from 'react';
import { style } from './phonebook.style';
import { PhoneBookContext } from './phonebook.provider';

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

export default InformationTable