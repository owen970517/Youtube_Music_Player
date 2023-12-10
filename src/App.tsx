import { BrowserRouter} from 'react-router-dom';
import './App.css';
import Page from './pages/Page';
import Header from './layout/Header';
import Footer from './layout/Footer';

const App:React.FC= () => {
  return (
    <BrowserRouter>
      <Header />
      <Page />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

