import React from 'react';
import Header from '../Header/Header';
import { renderRoutes } from 'react-router-config';

const App = ({route}) => {
  return (
    <main>
      <Header />
      <main className="fullwidth">
        {renderRoutes(route.routes)}
      </main>
    </main>
  );
}

export default {
  component: App
};