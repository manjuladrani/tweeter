/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


$(() => { // same as $(document).ready(() => {})
    
    
    function loadTweets() {
        console.log("inside load tweets");
        $.ajax({
            url: '/tweets',
            method: 'GET',
            datatype: "json",
            success: (tweets) => {
                //console.log("data:", tweets);
                tweets.reverse();
                renderTweets(tweets);
            }
        })
    }
    loadTweets();
   $("#error").hide();
    
    const createTweetElement = function (tweet) { 
        
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
            <p>${escape(tweet.content.text)}</p>
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
    
    const renderTweets = function(tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('#tweets-container').empty();
      for( let tweet of tweets) {
        $('#tweets-container').append(createTweetElement(tweet));
      }
      
    }
    
    
    $("#tweet-form").submit(function (event) {
        console.log('event');
        event.preventDefault();
        let charCount = $("#tweet-text").val().length;
        if (charCount === 0) {
            $(".displayerror").text("You need letters ot words to tweet");
            $("#error").slideDown();
            //alert("You need letters ot words to tweet");
        } else if (charCount > 140){
            $(".displayerror").text("Too many words to tweet");
            $("#error").slideDown();
            //alert("Too many words to tweet");
        } else {
            console.log($( this ).serialize());
            const serializedData = $(this).serialize();

            $.post("/tweets", serializedData, (response) => {
                //console.log("before calling");
                loadTweets();
                $("#tweet-text").val("");

            });
        }
        
    })





    /*The loadTweets function is defined here: It is an ajax GET request and takes the tweets as a JSON object and places them in the body of the response*/

    

    // const charCount = $(this).find("textarea")[0].value.length;
    // if (charCount === 0) {
    //     console.log($('#error') + "You need letters to tweet");
    // } else if (charCount > 140){
    //     console.log($('error') + "Too many letters");
    // } else {
    //     $.ajax({
    //         url:'/tweets',
    //         method:'POST',
    //         data: $(this).serialize(), 
    //         success: () => {
    //           $('.new-tweet').val('');
              
    //           $('.counter').text('140');
    //           loadTweets();  
    //         }    
    //       });

    // }

});  