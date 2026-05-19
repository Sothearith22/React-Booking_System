import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from '../features/auth';

export function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
