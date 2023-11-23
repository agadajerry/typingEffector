import TypeEffector from './TypeEffector';
const App: React.FC = () => {

  const wordsArr: string[] = ["Life is like an open book", "anybody can read it"];


  return (
    <TypeEffector wordsList={wordsArr}/>
  )
  }
export default App;
