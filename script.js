//An array of colors to cycle through
var colors = ["#66ccff", "#ff66cc", "#9933ff", "#33ff33", "#ff6633", "#ff3333", "#3333ff", "#ff1ac6", "#ff1a53", "#cc99ff", "#00cc99", "#cc6600", "#66cc00", "#ff0066"];

//URL for API
var quoteURL = "https://random-quote-generator.herokuapp.com/api/quotes/random";

//Variables to store quote and author
var currentQuote = '';
var currentAuthor = '';

//Get Quote Function
function getQuote () {
	$.getJSON(quoteURL, function(data) {
		currentQuote = data.quote;
		currentAuthor = data.author;
		
		var newColor = Math.floor(Math.random() * colors.length);
		
		$('body').animate({
			backgroundColor: colors[newColor]
		}, 1200);
		
		$('#tweet-button').animate({
			backgroundColor: colors[newColor]
		}, 1200);
		
		$('#new-quote-button').animate({
			backgroundColor: colors[newColor]
		}, 1200);
		
		$(".quote").animate({
			opacity: 0
        }, 600,
        function() {
			$(this).animate({
				opacity: 1,
				color: colors[newColor]
			}, 600);
			$('#quote-text').text(data.quote);
		});
		
		$(".quote-author").animate({
			opacity: 0,
		}, 600,
		function () {
			$(this).animate({
				opacity: 1,
				color: colors[newColor]
			}, 600);
			$('#author').text(data.author);
		});
	});
}
//Get Tweet Function
function getTweet () {
  var tweetQuote = '';
  for (var i = 0; i < currentQuote.length; i++)
    {
      if (currentQuote[i] !== ';' && currentQuote[i] !== '+' )
        {
          tweetQuote += currentQuote[i];
        }
      else
        {
          if (currentQuote[i] == ';')
            {
              tweetQuote += '%3B';
            }
          else
            {
              tweetQuote += '%2B';
            }
        }
    }
  $('#tweet-button').attr('href', 'https://twitter.com/intent/tweet?text='+ tweetQuote +'   -' + currentAuthor);
}
//Document ready function
$(document).ready(function() {
	getQuote();
  	getTweet();
	$('#new-quote-button').click(getQuote);
  	$('#tweet-button').click(getTweet);
});
