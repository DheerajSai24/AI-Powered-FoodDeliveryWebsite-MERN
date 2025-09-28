import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    const handlePlayStoreClick = () => {
        alert("This app will be available soon on the Google Play Store!");
    };

    const handleAppStoreClick = () => {
        alert("This app will be available soon on the Apple App Store!");
    };

    return (
        <div className='app-download' id='app-download'>
            <p>For better experience download our<br />Foodify App</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" onClick={handlePlayStoreClick} style={{ cursor: 'pointer' }} />
                <img src={assets.app_store} alt="" onClick={handleAppStoreClick} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    )
}

export default AppDownload
