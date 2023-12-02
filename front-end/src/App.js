import './App.css';
import  ForSale from './components/ForSale.js';
// import { Outlet } from 'react-router-dom';
import QuiverNav from './components/QuiverNav';
import { useAuthenticator } from '@aws-amplify/ui-react';

  
function App() {
    console.log('app comp');
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    
    console.log('user', user);
  return (
    <div>
      <QuiverNav></QuiverNav>
        This is the home page! To be updated soon...
    </div>
    
  );
}

export default App;
