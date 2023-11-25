import React from 'react';
import Menu from '../../components/Menu/Menu';
function Home() {
      return (
      <React.Fragment>
        <Menu />
        <main className="content">


        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <h1>CryptoSniffer tá on!</h1>
              <p>Farejador de boas oportunidades.</p>
              <a href="#" className="btn btn-primary">Saiba Mais</a>
            </div>
            <div className="col-lg-6">
              
              <img src="img/favicon/favicon.png" />
            </div>
          </div>
        </div>
        <p>
        {' '}

        {' '}
      </p>
            
        </main>
      </React.Fragment>
       
      );
};
    

export default Home;