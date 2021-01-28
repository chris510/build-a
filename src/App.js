import './App.css';
import Calculator from './components/calculator/calculator';
// import PhoneBook from './components/phonebook/phonebook';
import PhoneBook from './phoneBookOneFile';
import TicTacToe from './components/ticTacToe/ticTacToe';

const App = () => {
    return (
		<div className="App">
			<Calculator />
			<PhoneBook />
			<TicTacToe />
		</div>
    );
}

export default App;
