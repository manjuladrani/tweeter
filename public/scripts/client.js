/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => { // same as $(document).ready(() => {})
    const createTweetElement = function (tweet) { 

    //    const $article = $("<article>").addClass("exist-tweet");
    //    const $header = $("<header>").addClass("head");
    //    const $photo = $("<div>").addClass("photo");
    //    const $
    let markup = `
         <article class="exist-tweet">
          <header >
            <div class="photo">
              <img src= ${tweet.user.avatars}>
              <span>${tweet.user.name}</span>
            </div>
            <div class="name">
              <p>${tweet.user.handle}</p>
            </div>
          </header>
          
          <div class="message">
            <p>${tweet.content.text}</p>
          </div>
          <footer>
            <span>${jQuery.timeago(tweet.created_at)}</span>
            <div class="iconcontainer">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
          </footer>
        </article>`;
        return markup;

    };


 
    //   console.log($tweet);
    //   $(`<article class="tweet">Hello world</article>`);
    // const $title = $("<h1>").text(blog.title);
    // const $body = $("<p>").text(blog.body);
    // const $authorId = $("<p>").text(`author id: ${blog.userId}`) 

    //const $blog = $("<div>").addClass("blog-post");
    // $article.append($header, $body, $footer);   
    // return $article;
   
    // const tweetData = {
    //     "user": {
    //     "name": "Newton",
    //     "avatars": "https://i.imgur.com/73hZDYK.png",
    //         "handle": "@SirIsaac"
    //     },
    //     "content": {
    //         "text": "If I have seen further it is by standing on the shoulders of giants"
    //     },
    //     "created_at": 1461116232227
    // }

    // const $tweet = createTweetElement(tweetData);

    // // Test / driver code (temporary)
    // console.log($tweet); // to see what it looks like
    // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]
    
    const renderTweets = function(tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      for( let tweet of tweets) {
        
        $('#tweets-container').append(createTweetElement(tweet));



      }

    }
    
    // const createTweetElement = function(tweet) {
    //   let $tweet = /* Your code for creating the tweet element */
    //   // ...
    //   return $tweet;
    // }
    
    renderTweets(data);
    
    
});  