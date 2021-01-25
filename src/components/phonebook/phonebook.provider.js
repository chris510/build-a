import { createContext } from 'react';
import { useState } from 'react';

export const PhoneBookContext = createContext({
    users: [],
    setUser: () => {},
});

export const PhoneBookProvider = ({ children }) => {
    const [users, setUsers] = useState([
        {
            firstName: 'Chris',
            lastName: 'Trinh',
            phone: '9998887777'
        }
    ]);

    return (
        <PhoneBookContext.Provider
            value={{
                users,
                setUsers
            }}
        >
            {children}
        </PhoneBookContext.Provider>
    )
}



