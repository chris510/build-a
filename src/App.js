import './App.css';
import Calculator from './components/calculator/calculator';
// import PhoneBook from './components/phonebook/phonebook';
import PhoneBook from './phoneBookOneFile';

const App = () => {
    return (
		<div className="App">
			<Calculator />
			<PhoneBook />
		</div>
    );
}

export default App;
