import { Route, Routes } from 'react-router-dom';
import './styles/App.global.css';
import 'tailwindcss/tailwind.css';
import Home from './page/home';
import AppOutlet from './outlet/AppOutlet';
import SideNav from './components/SideNav';

type Props = {};

const App = (props: Props) => {
  return (
    <div className="w-full flex">
      <SideNav/>
      <AppOutlet />
    </div>
  );
};

export default App;
