import React, {useState, useEffect} from 'react';
import axios from 'axios' //for fetching apis
import './App.css';
import Coin from './coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() =>{
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res =>{
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toString().toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1> 
           <form>
             <input 
              placeholder="Search" 
              type="text"
              className="coin-input"
              onChange={handleChange}
             />
           </form>
      </div>
      {filteredCoins.map(coin => {
          return (
          <Coin
            key={coin.id}
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
          );
      })}
    </div>
  );
}

export default App;
