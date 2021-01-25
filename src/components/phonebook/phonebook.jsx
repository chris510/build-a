import React from 'react';
import PhoneBookForm from './phonebookForm';
import InformationTable from './informationtable';
import { PhoneBookProvider } from './phonebook.provider';

const PhoneBook = () => {
  return (
		<PhoneBookProvider >
			<PhoneBookForm />
			<InformationTable />
		</PhoneBookProvider>
  );
}

export default PhoneBook;