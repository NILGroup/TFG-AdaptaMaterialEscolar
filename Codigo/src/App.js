import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/header/header.component';
import EditorPage from './pages/editorpage/editorpage.component'
import HelpPage from './pages/helpPage/helppage.component';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/">
              <EditorPage/>
          </Route>
          <Route path="/help">
              <HelpPage/>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
