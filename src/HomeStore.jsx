import { create } from 'zustand';
import axios from 'axios';
import debounce from './debounce';

const HomeStore = create((set) => ({
  coins: [],
  query: "",
  trending: [],

  // Function to update the query and trigger searchCoins
  setQuery: (query) => {
    set({ query });
    // Trigger searchCoins after a debounce
    HomeStore.getState().debouncedSearchCoins();
  },

  // Debounced version of searchCoins function
  debouncedSearchCoins: debounce(() => {
    HomeStore.getState().searchCoins();
  }, 500), // Adjust debounce delay as needed

  // Function to search coins based on the query
  searchCoins: async () => {
    const { query, trending } = HomeStore.getState();
    if (query.length > 2) {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
        const coins = res.data.coins.map((coin) => ({
          name: coin.name,
          id: coin.id,
          image: coin.large
        }));
        set({ coins });
      } catch (error) {
        console.error("Error searching coins:", error);
        // Handle the error (e.g., display a message to the user)
      }
    } else {
      set({ coins: trending });
    }
  },

  fetchCoin: async () => {
    try {
      const [res, btcRes] = await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/search/trending'),
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
      ]);

      const btcPrice = btcRes.data.bitcoin.usd;

      const coins = res.data.coins.map((coin) => ({
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc.toFixed(10),
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(10),
      }));

      set({ coins, trending: coins });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error (e.g., display a message to the user)
    }
  }
}));

export default HomeStore;
