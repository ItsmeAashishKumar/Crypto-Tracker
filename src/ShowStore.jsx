import { create } from 'zustand'
import axios from 'axios'
import debounce from './debounce'

const ShowStore = create((set) => ({

    graph:[],
    fetchData:async (id)=>{

        const [graphRes,dataRes]=await Promise.all(
            [
                 axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`),
                 axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
            ]
        )

        const d=dataRes.data
        const graph=graphRes.data.prices.map((price)=>{
           
            const [timestamp,p]=price
            const date=new Date(timestamp).toLocaleDateString("en-us")

             
            return{
                
                    Price: p,
                    Date: date,
            }
            
        })
        set({graph,d})
    }

   
    
    
}))

export default ShowStore