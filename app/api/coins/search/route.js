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
    const { searchParams } = new URL(request.url);
    console.log(searchParams,"searchParams");
    console.log(request.url);

    // we need to get the query value
    const query = searchParams.get('query')

    const filteredCoin = coins.data.coins.filter((coin) => {
        return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
    })

    return NextResponse.json(filteredCoin)

}