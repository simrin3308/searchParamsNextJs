import { NextResponse } from "next/server";

async function fetchCoins() {
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd71a27a141msh5d6f29f76c2ba74p116807jsn995dfa0363fc',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };


    const response = await fetch(url, options);
    const coins = await response.json();
    return coins

}

export async function GET(request) {
    const coins = await fetchCoins()
    return NextResponse.json(coins)
}