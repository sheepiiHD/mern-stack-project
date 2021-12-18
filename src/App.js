import React,{useState, useEffect} from 'react'
import axios from 'axios';

import './App.css';
import Coin from './Coin';





function App() {
 const [coins, SetCoins] = useState([])
 const [search, setSearch] = useState('')

  useEffect(() =>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=sek&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      SetCoins(res.data)
    }).catch(error => console.log('Error with get request'))
  })

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1>Hitta din favorit</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
        </form>
        
        <div className="watchlist-container">
            <h1>WATCHLIST</h1>
            <div className="ul">
              <li>This is supposed to be appended item</li>

            </div>
          
        </div>
      </div>
      <div className="coin-list">
      <h1>Coins by Market Cap</h1>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id}
           name={coin.name} 
           image={coin.image}
           symbol={coin.symbol}
           marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          
          />
        )
      })}
    </div>
    </div>
  );
}

export default App;
