import React, { useEffect } from 'react'
import HomeStore from './HomeStore'
import { Link } from 'react-router-dom'
import Header from './Header'


function Home() {

  const store=HomeStore()
  useEffect(()=>{
    store.fetchCoin()
  },[])
  

  //input function
  const inp=(event)=>{
    const input=event.target.value
    store.setQuery(input)
  }



  return (

    <div className='home'>
      <Header/>
      
      <header className='home-search'>
        <h1>Search For a Coin</h1>
        <input type='text' value={store.query} onChange={inp}/>
      </header>
      <h1 className='trend'>Trending Coins</h1>
      {store.coins.map((coin)=>{
        return(
          
          <div className='coin-container' key={coin.id}>
            <div className='coins-info'>
              <div className='coin-icon'>
                <img src={coin.image} width="80px"/>
              </div>
              <div className='coin-detail'>
                  <Link className="link" to={`/${coin.id}`}>
                      <div className='coin-name'>{coin.name}</div>
                  </Link>
                  <div className='coin-value'>
                    <div className='img-coin'>
                      <img src='bit.png' width="26px"/>
                      <span>
                          ({coin.priceBtc})
                      </span>
                    </div>
                    <div className='usd'>
                    <span className='usd'>({coin.priceUsd} USD)</span>
                    </div>
                  </div>
              </div>
              
            </div>
          </div>
          
        )
      })}
    </div>
  )
}

export default Home

