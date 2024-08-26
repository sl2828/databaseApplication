import squirrel from './assets/squirrel.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={squirrel} className="Squirrel-picture" alt="squirrel" />
        <h1> Hello World! </h1>
        <p> This is going to be my database application project. </p>
      </header>
    </div>
  );
}

export default App;
