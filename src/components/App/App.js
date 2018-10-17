import React from 'react';
import Header from '../Header/Header';

export default ({ children }) => {
  return (
    <main className="wrapper">
      <Header />
      <main className="container">
        <section class="section">
          <div class="container">
            {children}
          </div>
        </section>
      </main>

    </main>
  );
}