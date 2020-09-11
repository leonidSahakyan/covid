import { Switch, Route } from 'react-router-dom'

import React from 'react';
import Root from './components/Root';
import NavBar from './components/NavBar'
import Header from './components/Header'
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal'
import ShareAppModal from './components/ShareAppModal'
import Disclaimer from './components/Disclaimer'
import Terms from './components/Terms'
import PrivacyPolicy from './components/PrivacyPolicy'

function App() {
  return (
    <div className="App">
      <div className="container-sm">
        <NavBar />
        <Header />
        <Switch>
          <Route path='/privacy'>
            <PrivacyPolicy />
          </Route>
          <Route path='/terms'>
            <Terms />
          </Route>
          <Route path='/disclaimer'>
            <Disclaimer />
          </Route>
          <Route path='/'>
            <Root />
            <Route path='/contact'>
              <ContactFormModal />
            </Route>
            <Route path='/share'>
              <ShareAppModal />
            </Route>
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
