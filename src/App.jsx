import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import PrivateRoute from './component/PrivateRoute';

import classes from './App.module.scss';

import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import DocsPage from './pages/DocsPage';
import UserLoader from './pages/UserLoader';
import HooksPage from './pages/Hooks';
import TodoList from './pages/TodoList'
import { themeEnum } from './enums';
import { useDispatch, useSelector } from './app/store';
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Registration'));
const Counter = lazy(() => import('./pages/Counter'));
const Calculator = lazy(() => import('./pages/Calculator'));

function App () {
  // аналоги
  const userState = useSelector(store => store.user);
  const theme = useSelector(store => store.theme);
  const dispatch = useDispatch();


  useEffect(() => {
    document.body.setAttribute('theme', theme.toLowerCase());
  }, [theme]);

  const setUser = () => {
    dispatch({
      group: 'user',
      type: 'setUser',
      payload: { firstName: Math.random() * 10 },
    });
  };

  const nextLang = () => {
    dispatch({
      group: 'lang',
      type: 'nextLang',
    });
  };

  const nextTheme = () => {
    dispatch({ group: 'theme', type: 'nextTheme' });
  };

  return (
    <BrowserRouter>
      <button onClick={nextLang}>Change Lang</button>
      <button onClick={setUser}>Change User</button>
      <button
        className={
          theme === themeEnum.DARK
            ? classes.themeBtnDark
            : classes.themeBtnLight
        }
        onClick={nextTheme}
      >
        След тема
      </button>

      <header>
        <Link to='/'>
          <img src='/logo192.png' alt='logo' width='50' />
        </Link>

        <nav>
          <ul>
            <li>
              {userState.data ? (
                <Link to='/profile'>Profile</Link>
              ) : (
                <>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
                </>
              )}
            </li>
            <li>
              <Link to='/calc'>Calculator</Link>
            </li>
            <li>
              <Link to='/counter'>Counter</Link>
            </li>
            {/* <li>
              <Link to='/hooks'>Hooks</Link>
            </li> */}
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/TodoList'>TodoList</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Suspense fallback={<CircularProgress />}>
        <main id='main'>
          <Switch>
            <Route exact path='/' component={HomePage} />

            <Route exact path='/docs'>
              {props => {
                return <DocsPage history={props.history} />;
              }}
            </Route>

            <Route exact path='/counter'>
              <Counter />
            </Route>

            {/* <Route exact path='/hooks'>
              <HooksPage />
            </Route> */}

            <Route exact path='/calc'>
              <Calculator scale='km' />
            </Route>

            <Route exact path='/login'>
              <LoginPage />
            </Route>

            <Route exace path='/register'>
              <RegisterPage />
            </Route>

            <Route exact path='/users'>
              <UserLoader />
            </Route>
            <Route exact path='/TodoList'>
              <TodoList />
            </Route>

            <PrivateRoute
              route={{ exact: true, path: '/profile', component: ProfilePage }}
              auth={userState.data}
            />

            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </main>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
