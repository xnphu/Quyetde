axios.get("http://localhost:1808/randomquestion")
.then(function (response) {
    if(response.data) {
        document.getElementById("questionContent").innerText = response.data.questionContent;
    }
})
.catch(function (error) {
	console.log(error);
}); 