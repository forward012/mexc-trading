import React, { useState, useEffect } from "react";
import {
    AllApi
} from './api';
import axios from "axios"

function Dashboard() {
    const [time, setTime] = useState();
    const [currentTime, setCurrentTime] = useState();

    const [leverage, setLeverage] = useState();
    const [triggerPrice, setTriggerPrice] = useState();
    const [prices, setPrices] = useState();
    const [quantify, setQuantify] = useState();
    const [takeProfitPrice, setTakeProfitPrice] = useState();
    const [stopLossPrice, setStopLossPrice] = useState();

    const pairs = ["BTC_USDT", "ETH_USDT", "SOLS_USDC"];
    const TOKEN = "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9"; // Replace with your actual API key
    const API_KEY = 'mx0vglMIXLJLF2DoIg';
    const API_SECRET = 'e3bb6b742ad94336ab7c6745ba600346';
    const BASE_URL = 'https://futures.testnet.mexc.com/api/v1/private/order/create';
    const COOKIES = {
        "uc_token": "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9",
        "u_id": "WEB79491cce2b958e3fd6fbc2e11d9ba78112720e1d0cd3417f5dcbafaf50a8ebf9",
    };
    const bot = new AllApi(TOKEN);
    
    const getCurrentTimeUSTMinus5 = () => {
        // Create a date object for the current time
        const currentDate = new Date();
        // Convert to UST-5 (Eastern Standard Time) using toLocaleString
        const options = {
            timeZone: 'America/New_York', // UST-5 during standard time
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Use 24-hour format
        };
        // Format the date and time
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
        // Split the formatted date into components
        const [date, time] = formattedDate.split(', ');
        // Replace slashes with colons and format as required
        const [month, day, year] = date.split('/');
        const [hour, minute, second] = time.split(':');
        // Return the formatted string
        return `${hour}:${minute}:${second}-${year}:${month}:${day}`;
    };

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(getCurrentTimeUSTMinus5()); 
        }, 1000)
    }, [])
    
    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            "authorization": COOKIES.uc_token,
            "Access-Control-Allow-Origin": "http://192.168.134.34:3000/"
            // "origin": "https://futures.testnet.mexc.com",
        }
        const marginObj = {
            amount: "500",
            positionId: "22165579",
            type: "ADD",
        };

        const payload = {
            "symbol": "BTC_USDT",
            "side": 1,
            "openType": 1,
            "type": "5",
            "vol": 101,
            "leverage": 50,
            "marketCeiling": false,
            "stopLossPrice": "97409.9",
            "takeProfitPrice": "99390.0",
            "lossTrend": "1",
            "profitTrend": "1",
            "priceProtect": "0",
        }
        let path = '/api/v1/private/order/create'
        const fetchData = async () => {
            try {
                const response = await axios.post(BASE_URL, payload, {
                    headers,
                });
            } catch (error) {
                console.error("Error in fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const obj3 = {
        symbol: "BTC_USDT",
        leverage: 50,
        price: 98500,
        triggerType: 1,
        triggerPrice: "98900",
        side: 3,
        openType: 1,
        orderType: 5,
        trend: 1,
        vol: "49572",
        takeProfitPrice: "97902.0",
        stopLossPrice: "99409.9",
        executeCycle: 3,
        marketCeiling: false,
        positionMode: 1,
        profitTrend: "1",
        lossTrend: "1",
        priceProtect: "0",
    };
      
    const tradingStart = () => {
        const marginObj = {
            amount: "500",
            positionId: "22165579",
            type: "ADD",
        };
        // const fetchData = async () => {
        //     try {
        //         const result_add = await bot.add_margin(marginObj);
        //         console.log("result_add_margin:", result_add);
        //     } catch (error) {
        //         console.error("Error in fetching data:", error);
        //     }
        // };
        // fetchData();
    }

    return (
        <>
        <div className="w-full px-8 pt-4">
            <label htmlFor="time" className="w-full flex justify-center text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 mr-4 text-lg font-semibold text-gray-700">
                Current Time(UST-5): {currentTime}
            </label>
            <div className="w-full flex justify-center items-center ">
                <label htmlFor="time" className="mb-2 mr-4 text-lg font-semibold text-gray-700">
                    Enter Trading Time: 
                </label>
                <input
                    id="time"
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    placeholder="MM:SS"
                />
            </div>
            <div className="flex gap-4 mt-4">
                Trading Pairs:
                {
                    pairs.map((name, index) => <label key={index} className="bg-blue-500 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 transition duration-200 ease-in-out">
                            {name}
                        </label>
                    )
                }
            </div>
            <div className="mt-4">
                <label htmlFor="time" className="mb-2 mr-4 text-lg font-semibold text-gray-700 text-nowrap">
                    Token Price: Market 
                </label>
                <label htmlFor="time" className="mb-2 mr-4 text-lg font-semibold text-gray-700 text-nowrap">
                    Leverage:
                </label>
                <input
                    id="time"
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    placeholder="%"
                />
            </div>

            <div className="flex gap-4 border rounded-xl p-4 mt-4">
                <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-300 transition duration-200 ease-in-out">
                    Close
                </button>

                <div className="flex items-center ">
                    <label htmlFor="time" className="mb-2 mr-4 text-lg font-semibold text-gray-700 text-nowrap">
                        High/Low Trigger Price(%): 
                    </label>
                    <input
                        id="time"
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-24 p-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        placeholder="%"
                    />
                    <input
                        id="time"
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-24 p-2 border border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        placeholder="%"
                    />
                </div>
                <div className="w-full flex items-center ">
                    <label htmlFor="time" className="mb-2 mr-4 text-lg font-semibold text-gray-700">
                        TP/SL($): 
                    </label>
                    <input
                        id="time"
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-24 p-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        placeholder="$"
                    />
                    <input
                        id="time"
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-24 p-2 border border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        placeholder="$"
                    />
                </div>

                <div className="w-full flex items-center ">
                    <label htmlFor="time" className="mb-2 mr-4 text-lg font-semibold text-gray-700">
                        Margin($): 
                    </label>
                    <input
                        id="time"
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-24 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        placeholder="%"
                    />
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 transition duration-200 ease-in-out">
                        ADD
                    </button>
                </div>
            </div>

            <button 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 transition duration-200 ease-in-out"
                onClick={tradingStart}
            >
                Trading Start
            </button>
        </div>
        </>
    )
}

export default Dashboard;