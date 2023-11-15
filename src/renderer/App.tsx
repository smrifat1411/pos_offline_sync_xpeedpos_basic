import { Route, Routes } from 'react-router-dom';
import './styles/App.global.css';
import 'tailwindcss/tailwind.css';
import Home from './page/home';
import AppOutlet from './outlet/AppOutlet';

type Props = {};

const App = (props: Props) => {
  return (
    <div className="bg-green-600">
      <AppOutlet />
    </div>
  );
};

export default App;
