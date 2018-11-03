let friendData = require('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendData);
    })

    app.post('/api/friends', function (req, res) {
        let newFriend = req.body;
        for (let i = 0; i < newFriend.scores.length; i++) {
            if (newFriend.scores[i] == "1 (Strongly Disagree)") {
                newFriend.scores[i] = 1;
            } else if (newFriend.scores[i] == "5 (Strongly Agree)") {
                newFriend.scores[i] = 5;
            } else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }


        }

        let diffArray = [];

        for (let i = 0; i < friendData.length; i++) {

            let comparedFriend = friendData[i];
            let totalDiff = 0;

            for (let d = 0; d < comparedFriend.scores.length; d++) {
                let diffOneScore = Math.abs(comparedFriend.scores[d] - newFriend.scores[d]);
                totalDiff += diffOneScore;

            }
            diffArray[i] = totalDiff;
        }

        let bfNum = diffArray[0];
        let bfIndex = 0;

        for (let i = 1; i < diffArray.length; i++) {
            if (diffArray[i] < bfNum) {
                bfNum = diffArray[i];
                bfIndex = i;

            }

        }

        friendData.push(newFriend);

        res.json(friendData[bfIndex]);


    });


};