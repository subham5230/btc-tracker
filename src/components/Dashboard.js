import React from 'react'
import MainContent from './MainContent'

function Dashboard() {
    return (
        <>
        <div className='d-flex justify-content-center' style={{position: 'relative', background: 'transparent', width: '80%', height: '10%', borderRadius: '35px'}}>

            <div className='p-3'>
                <span style={{color: 'lightgray', fontSize: '2rem', fontWeight: '400'}}>Bitcoin Price Tracker</span>
            </div>
            
        </div>
        <div className='d-flex justify-content-center' style={{position: 'relative', background: 'transparent', width: '80%', height: '80%'}}>

                <MainContent />
            
        </div>
        </>
    )
}

export default Dashboard
