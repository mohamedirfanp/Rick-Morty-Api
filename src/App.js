import logo from './logo.svg';
import './App.css';
import DashboardComponent from './Components/DashBoardComponent/DashboardComponent';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <section className="App-header">
        <QueryClientProvider client={queryClient}>
          <DashboardComponent />
        </QueryClientProvider>

      </section>
    </div>
  );
}

export default App;
