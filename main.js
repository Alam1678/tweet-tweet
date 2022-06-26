const tweetPostBoxElm = document.querySelector('.tweetPost');
const tweetpostElm = document.querySelector('.tweetPost input[type="text"]');
const tweetSubBtn = document.querySelector('.tweetPost [type="submit"]');
const tweetCountElm = document.querySelector('.countHere');
const tweetSearchElm = document.querySelector('.searchTweets input[type="text"]');
const tweetListElm = document.querySelector('.tweetList');
const orderedTwitterlistElm = document.querySelector('.tweetList ol');
const tweetListTextElm = document.querySelector('.tweetList ol li');
const postTime = document.querySelector('.postTime');
const deleteBtn = document.querySelector('.dlt-btn');

let tweetArr = [];
let tweetWordArr = 0;
let itemId;

let date = new Date().toLocaleString({ hour: 'numeric', minute: 'numeric', hour12: true });

console.log(date);

function updateLocalStorage(){
    if(localStorage.getItem('storeTweets')){
        localStorage.setItem('storeTweets', JSON.stringify(tweetArr));
    }
}


function resetTweetText(){
    tweetpostElm.value = '';
}

function gettingTweetText(){

        let tweetText = tweetpostElm.value;
        // console.log(tweetText);

        return tweetText;
}

function validInputs(textVal){
    if(textVal === ''){
        alert('Write something')
        return false;
    }else{
        return true;
    }

    // countWord()
}

tweetSubBtn.addEventListener('click', function(e){
    e.preventDefault();

    const id = tweetArr.length+1;

    tweetCountElm.textContent = 0;
    const tweetText = gettingTweetText();
    // console.log(tweetText)

    // let date = new Date().toDateString();

    // console.log(date);


    const valInput = validInputs(tweetText);

    const createTweet = {
        id : id,
        post : tweetText,
        time : date
    }

    if(valInput){
        tweetArr.push(createTweet)

        resetTweetText();
        listingTweets(id, tweetText, date);
        showFilterItem(tweetArr);

        storeDataLocalStorage(createTweet);
    }

    

    // console.log(tweetArr);

    

    // console.log(tweetArr);

    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();

    // newdate = year + "/" + month + "/" + day;
    

    // let postTime =  newdate;

    

    // let currDate = date.toLocaleString();
    // console.log(typeof currDate)

    // console.log(postTime);

    

})

function countWord(){

    let tweetText = tweetpostElm.value;
    tweetWordLength = tweetText.split(' ').length;

    tweetCountElm.textContent = tweetWordLength;

    if(tweetWordLength > 250 ){
        alert('Word Limit reached');
    }
}

tweetpostElm.addEventListener('keyup', function(e){


    countWord();
})

// console.log(tweetTextArr.length)

function listingTweets(id, post, postTime){

            let tweetElm =
        `
        <li class="item-${id}"> ${post}
        <br>
        <br>
        <p class="postTime"><b><i>${postTime}</i></b></p>
        <br>
        <button class="dlt-btn">Delete</button>
        </li>
        `

        orderedTwitterlistElm.insertAdjacentHTML('beforeend', tweetElm)
}

tweetSearchElm.addEventListener('keyup', e => {
    const filterValue = e.target.value;
    const filterPost = tweetArr.filter( item => item.post.includes(filterValue));


    showFilterItem(filterPost)
})

function showFilterItem(fillterItem){
    orderedTwitterlistElm.innerHTML = '';
    fillterItem.forEach(element => {
        // console.log(element);
        let tweetElm =
        `
        <li class="item-${element.id}">${element.post}
        <br>
        <br>
        <p class="postTime"><b><i>${element.time}</i></b></p>
        <br>
        <button class="btn btn-danger dlt-btn">Delete</button>
        <button class="btn btn-primary edt-btn">Edit</button>
        </li>
        `

        orderedTwitterlistElm.insertAdjacentHTML('beforeend', tweetElm)
    });
}
function ConfirmDelete()
{
  return confirm("Are you sure you want to delete?");
}

orderedTwitterlistElm.addEventListener('click', e => {
    
    if(e.target.classList.contains('dlt-btn')){
        let id = getItemId(e.target);
        removeTweetFromList(id);
        removeTweetFromArr(id);
        deleteTweetFromLocalStorag(id);
    }else if(e.target.classList.contains('edt-btn')){
        // console.log('Edit butn');
        itemId = getItemId(e.target);
        const foundTweet = tweetArr.find( tweets => {
            if(tweets.id === itemId){
                return tweets.post;
            }
        });

        populateUiInEdit(foundTweet);

        if(!document.querySelector('.updateBtn')){
            showUpdateBtn();
        }

        
       
    }   
    // console.log(tweetArr)   
})

function showUpdateBtn(){
    const editBtnElem = `<input class="btn btn-primary updateBtn" type="button" value="UPDATE">`

    tweetSubBtn.style.display = "none";

    tweetPostBoxElm.insertAdjacentHTML('beforeend', editBtnElem);
}

tweetPostBoxElm.addEventListener('click', function(e){

    // let date = new Date().toDateString();

    if(e.target.classList.contains('updateBtn')){
        const tweetText = gettingTweetText();
        resetTweetText();
        tweetSubBtn.style.display = "block";

        date = new Date().toLocaleString({ hour: 'numeric', minute: 'numeric', hour12: true });

        validInputs(tweetText);

        tweetArr = tweetArr.map( tweet => {
            if(tweet.id === itemId){
                // console.log({
                //     id : tweet.id,
                //     post : tweetText,
                //     time : date
                // });
                return {
                    id : tweet.id,
                    post : tweetText,
                    time : 'Post updated in : ' + date
                }
            }else{
                // console.log(tweet);
                return tweet;
            }
        })

        showFilterItem(tweetArr);

        document.querySelector('.updateBtn').remove();

        // console.log(updatedTweetArr);

        updateLocalStorage();
    }

    

    
})



function populateUiInEdit(tweet){
    tweetpostElm.value = tweet.post;
    // console.log(tweet);
}

function updateAfterRemoveTweet(id){
    return tweetArr.filter( elm => elm.id !== id);
}

function removeTweetFromArr(id){
    let filterTweet = updateAfterRemoveTweet(id);
    tweetArr = filterTweet;
    // console.log(tweetArr);
}

function removeTweetFromList(id){
    document.querySelector(`.item-${id}`).remove();
    // console.log(idLoc);
}

function getItemId(itemId){
    const liElm = itemId.parentElement.classList[0].split('-')[1];

    return Number(liElm);
    
    // console.log(liElm);
}

function showItemtoUi(element){
    fillterItem.forEach(element => {
        let tweetElm =
        `
        <li class="item-${element.id}">${element.post}
        <br>
        <br>
        <p class="postTime"><b><i>${element.time}</i></b></p>
        <br>
        <button onclick="ConfirmDelete()" class="btn btn-danger dlt-btn">Delete</button>
        <button class="btn btn-primary edt-btn">Edit</button>
        </li>
        `

        orderedTwitterlistElm.insertAdjacentHTML('beforeend', tweetElm)
    });
}

// store data in localStorage

function storeDataLocalStorage(tweet){

    // console.log(typeof(tweet));

    // if(typeof tweet === 'object' && Array.isArray(tweet)){
    //     console.log('Array found')
    // }else{
    //     console.log('Not found');
    // }

    // if(tweet.length === 0){
    //     console.log('Emply array');
    // }

    let localTweet = [];

    if(localStorage.getItem('storeTweets')){
        localTweet = JSON.parse(localStorage.getItem('storeTweets'));
        localTweet.push(tweet)

        localStorage.setItem('storeTweets', JSON.stringify(localTweet))
    }else{
        localTweet = [];

        localTweet.push(tweet);
        
        localStorage.setItem('storeTweets', JSON.stringify(localTweet))
    }
   
    
}

document.addEventListener('DOMContentLoaded', function(e){
    if(localStorage.getItem('storeTweets')){
        tweetArr = JSON.parse(localStorage.getItem('storeTweets'));
        // for(let i = 0; i < localTweet; i++){
        //     console.log(localTweet[i]);
        // }
        // console.log(tweetDetail);
        showFilterItem(tweetArr);
    }
})

function deleteTweetFromLocalStorag(id){
    const fullTweetDet = localStorage.getItem('storeTweets');
    console.log(fullTweetDet);
    const tweetAfterRemove = updateAfterRemoveTweet(id, fullTweetDet);

    console.log(tweetAfterRemove);
    localStorage.setItem('storeTweets', JSON.stringify(tweetAfterRemove));
}

// const time = document.querySelector('.time');
// time.textContent = new Date().toDateString();