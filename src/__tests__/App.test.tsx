import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../renderer/App';

// App does not carry its own Router - index.tsx wraps it in a MemoryRouter, and
// AuthContextProvider calls useNavigate on mount. Rendering a bare <App /> threw
// "useNavigate() may be used only in the context of a <Router>", so the only test
// in the repo had been failing. Mounting it the way the app actually runs makes
// this a real smoke test: every context provider in the tree has to construct
// without throwing for it to pass.
describe('App', () => {
  it('renders inside a router without throwing', () => {
    expect(
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      ),
    ).toBeTruthy();
  });
});
