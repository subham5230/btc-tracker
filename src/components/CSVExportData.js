import React from 'react';
import coinGecko from "../apis/coinGecko";



function CSVExportData() {
    
    const id= 'bitcoin';
    const currency = 'usd';

    let fromDate = React.createRef();
    let toDate = React.createRef();

    let CSVPayload = 'Date(UTC), Price(USD), Market_Cap(USD), Volume\n,,,\n';

    function downloadCSVFile(payload){
        const element = document.createElement("a");
        const file = new Blob([payload], {type: 'text/csv'});
        element.href = URL.createObjectURL(file);
        element.download = "Bitcoin-Historical-Report.csv";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    function handleCSVSubmit(){
        console.log(Date.parse(fromDate.current.value), Date.parse(toDate.current.value));

        let from = Number(Date.parse(fromDate.current.value));
        from = String((from / 1000).toFixed(0));

        let to = Number(Date.parse(toDate.current.value));
        to = String((to / 1000).toFixed(0));

        coinGecko.get(`/coins/${id}/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}}`)
            .then((res)=>{
                const data = res.data;
                // console.log(data);
                // console.log(CSVPayload);

                for(let i=0; i<data.prices.length; i++){
                    let date = new Date(data.prices[i][0]);

                    // date = String(`${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`)
                    
                    let payload = `${date.toUTCString().substring(4)}, ${data.prices[i][1]}, ${data.market_caps[i][1]}, ${data.total_volumes[i][1]}\n`

                    CSVPayload += payload;
                }

                console.log(CSVPayload);

                downloadCSVFile(CSVPayload);
            })
    }

    return (
        <>
        <div className='p-3'>
            <span className='text-light' style={{fontSize: '1.4vw'}}>Historical Data</span>
        </div>


        <div>
            <div className='d-flex py-2 justify-content-between' style={{padding: '0 20%'}}>
                <span className='text-light' style={{fontSize: '1.2vw'}}>From Date :</span>
                <input className='px-2' type='date' ref={fromDate} style={{background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgb(151, 103, 187)', borderRadius: '8px', width: '60%'}}/>
            </div>
            <div className='d-flex py-2 justify-content-between' style={{padding: '0 20%'}}>
                <span className='text-light' style={{fontSize: '1.2vw'}}>To Date:</span>
                <input className='px-2' type='date' ref={toDate} style={{background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgb(151, 103, 187)', borderRadius: '8px', width: '60%'}}/>
            </div>
            <div className='d-flex py-2 pt-5 justify-content-center' style={{padding: '0 20%'}}>
                <button className='csv-btn p-2' onClick={handleCSVSubmit} style={{background: 'rgba(124, 86, 153, 0.4)', color: 'white', borderRadius: '8px', border:'1px solid rgb(151, 103, 187)', fontSize: '0.8vw'}}>Download CSV</button>
            </div>
        </div>
        </>
    )
}

export default CSVExportData
