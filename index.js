/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++)
    {
    
        const content= `<img class =game-img src = ${games[i].img } ></img><b> ${ games[i].name }</b>  <p>${ games[i].description }<p>   
            `
        // create a new div element, which will become the game card
          const newdiv =  document.createElement("div");
   
       newdiv.innerHTML = content ;
   
       
    //     // add the class game-card to the list
      newdiv.classList.add("game-card");

    //     // append the game to the games-container

          gamesContainer.append(newdiv);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
//mapping
///const backers = GAMES_JSON.map()
// use reduce() to count the number of total contributions by summing the backers
const games = GAMES_JSON.reduce(
    (accumulator, currentValue) => {
        return accumulator + currentValue.backers},0
  );

  contributionsCard.innerHTML = games.toLocaleString();
  console.log(games);
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raised = GAMES_JSON.reduce(
    (accumulator, currentValue) => {
        
     return accumulator + currentValue.pledged}
    
    ,0
  );
// set inner HTML using template literal
raisedCard.innerHTML = raised.toLocaleString();

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
     
   let gamesFiltered = GAMES_JSON.filter((games)=>{
   
    return games.pledged < games.goal;
   })
 


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesFiltered);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let gamesFiltered = GAMES_JSON.filter((games)=>{

        return games.pledged >= games.goal;
       })
     
    
       console.log ("games funded =" + gamesFiltered);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesFiltered);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const  unfunded = GAMES_JSON.filter((games)=>{
    
    return  games.pledged >= games.goal;
   }).length

// create a string that explains the number of unfunded games using the ternary operator

let unfundedgames = `A total of ${raised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. ${unfunded == 1 ? "Curently, 1 game remains unfunded. We need your help to fund these amazing games!"
 : `Curently, ${unfunded} games remains unfunded. We need your help to fund these amazing games!`} `
 
 
 function getFee(isMember) {
    return (isMember ? '$2.00' : '$10.00');
  }

  console.log(getFee(true));
// create a new DOM element containing the template string and append it to the description container
const para = document.createElement("p"); 
const node = document.createTextNode(unfundedgames);
para.appendChild(node);
 descriptionContainer.appendChild(para);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const { name, ...rest } = GAMES_JSON[0];

const{ ...others} = GAMES_JSON[1];
// const { name, ...others } = GAMES_JSON[1];
// create a new element to hold the name of the top pledge game, then append it to the correct element
const div = document.createElement("div");
const node1 = document.createTextNode(name);
div.appendChild(node1);
firstGameContainer.appendChild(div);


// // do the same for the runner up item
const div1 = document.createElement("div");
const node2 = document.createTextNode(others.name);
div1.appendChild(node2);
secondGameContainer.appendChild(div1);