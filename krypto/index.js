const CURRENCY = 'EUR';
const SYMBOL = '€';
const INITIAL = 1000;

function populate(coins) {
    const t = $('table tbody');
    t.empty();
    let sum = 0;
    Object.keys(coins).forEach((coin) => {
        const c = coins[coin];
        t.append(`<tr>
            <td>${coin}</td>
            <td class="a-r">${c.value}${SYMBOL}</td>
            <td>${c.have}</td>
            <td class="a-r">${parseFloat(c.total).toFixed(2)}${SYMBOL}</td>
            </tr>`);
        sum += c.total;
    });
    const gains = parseFloat(sum - INITIAL).toFixed(2);
    const perc = Math.ceil(sum / INITIAL * 100 - 100);
    t.append(`<tr>
        <td></td><td></td><td></td>
        <td class="a-r">${parseFloat(sum).toFixed(2)}${SYMBOL}</td>
        <td class="${gains < 0 ? 'loss' : 'win'}">
            ${gains >= 0 ? '+' : ''}${gains}${SYMBOL}
        </td>
        <td class="${gains < 0 ? 'loss' : 'win'}">
            ${gains >= 0 ? '+' : ''}${perc}%
        </td>
        </tr>`);
}

function fetch(coin)
{
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${CURRENCY}`;
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    console.log(req.responseText);
    return req.responseText;
}

$(() => {
    const coins = {
        ETH: {have: 0.47982},
        BTC: {have: 0.03600},
        XMR: {have: 1.17696},
    };
    console.log(coins);
    populate(coins);

    Object.keys(coins).forEach((coin) => {
        console.log(coin);
        try {
            const js = JSON.parse(fetch(coin));
            coins[coin].value = js[CURRENCY]
            coins[coin].total = js[CURRENCY] * coins[coin].have;
        } catch(e) {
            console.log(e);
            coins[coin].value = '–';
            coins[coin].total = '(Fehler)';
        }
    });
    console.log(coins);
    populate(coins);

    //https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD
});
