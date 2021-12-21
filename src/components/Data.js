import React from 'react'
import CoinRealtimeData from './CoinRealtimeData'
import CSVExportData from './CSVExportData'

function Data() {
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <div className='my-2'>
                <CoinRealtimeData />
            </div>
            <div className='my-2 mt-4'>
                <CSVExportData />
            </div>
        </div>
    )
}

export default Data
