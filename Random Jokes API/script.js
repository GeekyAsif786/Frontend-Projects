const searchButton = document.querySelector('#btn');
const url = "https://official-joke-api.appspot.com/jokes/random";
const paraJoke = document.querySelector('#para');
const parajoke2 = document.querySelector('#para2');
const getJokes = async () =>
{
    console.log("Getting Jokes...");
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    console.log(data);
    paraJoke.innerText = data.setup;
    parajoke2.innerText = data.punchline;
};
searchButton.addEventListener("click",getJokes);