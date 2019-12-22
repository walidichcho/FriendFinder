// we are calling friends.js file because will be use to look for friend match

var friends = require("../data/friends.js");


// ROUTING
// 
module.exports = function (app) {
    // api Get request, when the user visit the page localhot7500/api/friends.
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // the new friend fill up the form and will be send to friends.js file

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        // Receive user as objet
        var user = req.body;

        // parseInt for scores
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        // the good match when the differnce is 0
        // the bad match is when the differnce is 40 (4x10)

        var bestFriendIndex = 0;
        var minimumDifference = 40;

        // we need to loops
        // one loop we go through all friends file
        // second will check scores from each friend
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        // after finding match, add user to friend array
        friends.push(user);

        // send back to browser the best friend match
        res.json(friends[bestFriendIndex]);
    });
};



