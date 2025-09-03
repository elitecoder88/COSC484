var axios = require('axios');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var jsonData = require('./credentials.json');

//Make it so it accepts multiple 1 name artists
var artist = process.argv.slice(2);

if (artist.length == 0) {
    console.log("You did not specify an artist(s)")
}

var topArtists = [];
var topSongs = [];


axios.get('http://www.popvortex.com/music/charts/top-rap-songs.php')
.then(function(response) {
    var html = response.data;
    var $ = cheerio.load(html);
    
    //Top 25 artists & Top 25 songs
    $('em.artist').each(function(i, element) {
        if (i < 25) {
            topArtists.push($(this).text());
            topSongs.push($(this).siblings('cite.title').text())
        }
    });

    //Song(s) that matches the artist when artist entered is found in top 25
    var matchArtits = [];
    var matchSongs = [];

    artist.forEach((element1, index1) => {
        if (!topArtists.includes(element1)) {
            console.log(`Artits no ${index1 + 1} entered is not found in the top 25`);
        } else {
            topArtists.forEach((element2, index2)=> {
                if (element1 == element2) {
                    matchArtits.push(topArtists[index2]);
                    matchSongs.push(topSongs[index2]);
                }
            });
        }
    });

    //Determines if email will be sent or not
    if (matchArtits.length > 0) {
        
        //Avoid artits to duplicate in subject of mail
        var uniqueArtists = new Set();

        matchArtits.forEach(element => {
            uniqueArtists.add(element);
        });
        var uniqueArtistsArray = Array.from(uniqueArtists);

        var htmlText = "";
        for (var i = 0; i < matchArtits.length; i++) {
            htmlText += '<b>' + matchArtits[i] + ':</b> <i>' + matchSongs[i] + '</i><br>';
        }
        
        var mailSubject = 'Your artist(s) are: ' + uniqueArtistsArray.join(', ');
        
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: jsonData.sender_email,
                pass: jsonData.sender_password,
            },
        });
        
        let mailOptions = {
            from: `"${jsonData.from}" <${jsonData.sender_email}>`,
            to: jsonData.to,
            subject: mailSubject,
            text: htmlText,
            html: htmlText
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            
            console.log('Message sent %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        });
    }
}).catch(function (error) {
    console.log(error);
});