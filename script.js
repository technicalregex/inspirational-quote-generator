const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter");
const loader = document.getElementById("loader");

let counter = 0;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://tranquil-headland-71295.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        if (!data.quoteAuthor){
            author.textContent = "Unknown";
        } else {
            author.textContent = data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove("long-quote");
        }

        quoteText.textContent = data.quoteText;
        removeLoadingSpinner();
    } catch(error) {
        if(counter <= 10) {
            getQuote();
            alert("Error: Please reload the page");
        };
        console.log(error);
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank')
}

newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);
getQuote();
