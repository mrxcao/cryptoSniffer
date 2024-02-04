import React, { useEffect, useState } from 'react';
//import React from 'react';
import Menu from '../../components/Menu/Menu';



function Home() {
  const [apiOn, setApiOn ] = useState("")

  useEffect(()=>{
     // if(!localStorage.getItem('Wallet')) throw new Error('sem carteira')
     console.log('verificar api online aqui')
     /*
     getApiOn()
        .then( data => {
          console.log('on',data)
        })
        .catch( err => {
          console.error(err)
        })
        */
  },[])

      return (
      <React.Fragment>
        <Menu />
        <main className="content">

        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <h1 ClassName="appTitle">CryptoSniffer tá on!</h1>
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