import './App.css';
import Calculator from './components/calculator/calculator';
// import PhoneBook from './components/phonebook/phonebook';
import PhoneBook from './phoneBookOneFile';
import TicTacToe from './components/ticTacToe/ticTacToe';
import AutoComplete from './components/autocomplete/autocomplete';

const App = () => {
    return (
		<div className="App">
			<Calculator />
			<PhoneBook />
			<AutoComplete />
			{/* <TicTacToe /> */}
		</div>
    );
}

export default App;
