import React from 'react';
import Header from '../Header/Header';
import { renderRoutes } from 'react-router-config';

const App = ({route}) => {
  return (
    <main className="wrapper">
      <Header />
      <main className="container">
        <section className="section">
          <div className="container">
            {renderRoutes(route.routes)}
          </div>
        </section>
      </main>

    </main>
  );
}

export default {
  component: App
};