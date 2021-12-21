import React from 'react'
import Chart from './Chart'
import Data from './Data'

function MainContent() {
    return (
        <div className='row' style={{positon: 'relative', width: '90%', borderRadius: '35px', background: 'linear-gradient(278deg, rgb(113 112 114 / 22%) 0%, rgb(31 30 31 / 32%) 100%)'}}>
            <div className='col-lg-6' style={{position: 'relative', background: 'transparent', borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px'}} >
                <Chart /> 
            </div>
            <div className='col-lg-6 d-flex justify-content-center' style={{position: 'relative', paddingBottom: '6rem', background: 'transparent', borderTopRightRadius: '35px', borderBottomRightRadius: '35px', alignItems: 'center'}}>
                <Data />
            </div>
        </div>
    )
}

export default MainContent
