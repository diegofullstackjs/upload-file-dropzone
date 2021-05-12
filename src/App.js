import Upload from "./components/upload";


function App() {
  return (
    <Upload 
    accept={'.xlsx,.xlsm,.xlsb,.docx'}
    maxFiles={1}
    />
  );
}

export default App;
