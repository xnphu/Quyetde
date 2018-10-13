$.ajax({
    url: "http://localhost:1808/vote_result",
    type: "GET",
    success: function(response) {
        console.log(response);
        if(response) {
            let totalVote = response.yes + response.no;
            let percentVoteYes = ((response.yes / totalVote) * 100).toFixed(2);
            let percentVoteNo = ((response.no / totalVote) * 100).toFixed(2);
            $("#questionContent").text(response.questionContent);
            $("#total_vote").text(totalVote);
            $("#voteYes").text(percentVoteYes);
            $("#voteNo").text(percentVoteNo);
        }
    },
    error: function(err) {
        console.log(err);
    }
});

