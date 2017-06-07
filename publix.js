var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

// app.get('/scrape', function(req, res){

search_key = 'salmon';
store_id = '2595903';
cat_bogo = '5117977';

//url = 'http://weeklyad.publix.com/Publix/BrowseByListing/ByCategory/?StoreID=' + store_id + '&CategoryID=' + cat_bogo;
url = 'http://weeklyad.publix.com/Publix/BrowseByListing/BySearch/?StoreID=' + store_id + '&SearchText=' + search_key;

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, price, savings;
    var json = { title : "", price : ""};

    $('.gridTileUnitB').filter(function(){
        var data = $(this);
        title = data.find('.title.cursorPointer.action-tracking-nav.action-goto-listingdetail.excludeFromIpad.mobileBBDTitle').text().trim();
        price = data.find('.deal span').text().trim();



        json.title = title;
        json.price = price;

        console.log('title: ' + title);
        console.log('price: ' + price);
    })

    // $('.savingsValue strong span[itemProp="savingsValue"]').filter(function(){
    //     var data = $(this);
    //     savings = data.text();

    //     console.log('found savings: ' + savings);
    //     json.savings = savings;
    // })
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
//res.send('Check your console!')

    }) ;
// })

// app.listen('8081')
// console.log('Magic happens on port 8081');
// exports = module.exports = app;