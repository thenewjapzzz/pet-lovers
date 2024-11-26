import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/auth/login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
