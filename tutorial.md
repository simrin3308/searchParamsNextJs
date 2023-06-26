# Next js search functionality

1. Create a search component.
2. Wrap the input field in the form with on submit handler on it.

```js
<form onSubmit={handleSubmit}>
  <input
    className="text-black border-2 border-black rounded-full px-3 py-2"
    type="text"
    placeholder="Search coin..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button
    className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60"
    type="submit"
  >
    Search
  </button>
</form>
```

3. In the handleSubmit, we need to send the request to the backend. We will const response and fetch it with the parameters with passing the query. We will get this query in backend. Don`t forget to response.json().

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch(`/api/coins/search?query=${query}`);
  const coin = await response.json();
  getSearchResults(coin);
};
```

4. At the backend create folder, 'api/coins/search/route.js'
5. In route.js, fetch all the coins first.
6.

```js
const { searchParams } = new URL(request.url);
console.log(searchParams, "searchParams");
```

RESULT=>
{ 'query' => 'bitcoin' } searchParams 7. Now we get the value of query

```js
const query = searchParams.get("query");
```

8. We have the query now. At last we will create filter function that will get the desired result.
   We need to write toLowerCase() because it will reduce risk of errors while searching

```js
const filteredCoin = coins.data.coins.filter((coin) => {
  return (
    coin.name.toLowerCase().includes(query.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(query.toLowerCase())
  );
});
```

9. At last we need to return the filteredCoin with the help of NextResponse.

10. All function is here=>

```js
export async function GET(request) {
  const coins = await fetchCoins();
  const { searchParams } = new URL(request.url);
  console.log(searchParams, "searchParams");

  // we need to get the query value
  const query = searchParams.get("query");

  const filteredCoin = coins.data.coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
    );
  });

  return NextResponse.json(filteredCoin);
}
```
