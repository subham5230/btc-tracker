import React from 'react'
import coinGecko from "../apis/coinGecko";

function CoinRealtimeData() {

    const [data, setData] = React.useState({
        'price': 0,
        'market_cap': 0,
        'change_percent': 0
    });

    const [timer, setTimer] = React.useState(1);

    React.useEffect(() => {
        const interval = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 5000);
        return () => clearInterval(interval);
      }, []);

    React.useEffect(()=>{
        coinGecko.get("/coins/markets/", {
            params: {
                vs_currency: "usd",
                ids: 'bitcoin',
            }})
            .then((res)=>{
                setData({
                    'price': res.data[0].current_price,
                    'market_cap': res.data[0].market_cap,
                    'change_percent': res.data[0].price_change_percentage_24h
                });
            })
    }, [timer])

    return (
        <div>
        <div className=''>
            <span className='text-light' style={{fontSize: '1.7vw'}}>Bitcoin</span>
        </div>


        <div>
            <div className='d-flex py-2 justify-content-between' style={{padding: '0 20%'}}>
                <span className='text-light' style={{fontSize: '1.2vw'}}>Price :</span>
                <span className='text-light' style={{fontSize: '1.2vw'}}>$ {data.price}</span>
            </div>
            <div className='d-flex py-2 justify-content-between' style={{padding: '0 20%'}}>
                <span className='text-light' style={{fontSize: '1.2vw'}}>Market cap :</span>
                <span className='text-light' style={{fontSize: '1.2vw'}}>$ {data.market_cap.toLocaleString()}</span>
            </div>
            <div className='d-flex py-2 justify-content-between' style={{padding: '0 20%'}}>
                <span className='text-light' style={{fontSize: '1.2vw'}}>Price Change (24h) :</span>
                <span className='' style={data.change_percent>=0 ? {fontSize: '1.2vw', color: 'green'} : {fontSize: '1.2vw', color: 'red'}}>{data.change_percent}%</span>
            </div>
        </div>
        </div>
    )
}

export default CoinRealtimeData
