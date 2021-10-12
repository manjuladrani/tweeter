/* defining escape function*/

const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


$(() => { // same as $(document).ready(() => {})
    
    /*The loadTweets function is defined here: It is an ajax GET request and takes the tweets as a JSON object and places them in the body of the response*/

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
    


    /* The CreateTweetElement function is defined here: takes the body of the tweet from the form and renders it to the tweet container*/
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

    /*The renderTweets function is defined here: Loops through the array of tweets in the database and renders them to the 'tweets' class going from newest to oldest.The createTweetElement function is called for each tweet to be rendered*/
    const renderTweets = function(tweets) {
      
      $('#tweets-container').empty();
      for( let tweet of tweets) {
        $('#tweets-container').append(createTweetElement(tweet));
      }
      
    }
    /* tweet form submission */ 
    
    $("#tweet-form").submit(function (event) {
        console.log('event');
        event.preventDefault();
        let charCount = $("#tweet-text").val().length;
        if (charCount === 0) {
            $(".displayerror").text("You need letters to tweet");
            $("#error").slideDown();
            
        } else if (charCount > 140){
            $(".displayerror").text("Too many words to tweet");
            $("#error").slideDown();
            
        } else {
            console.log($( this ).serialize());
            const serializedData = $(this).serialize();

            $.post("/tweets", serializedData, (response) => {
                
                loadTweets();
                $("#tweet-text").val("");

            });
        }
        if(charCount > 0 && charCount < 140) {
          $(".displayerror").text("");
          $("#error").hide();
        }
        
    })
    

    

});  