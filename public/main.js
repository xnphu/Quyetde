// axios.get("http://localhost:1808/randomquestion")
// .then(function (response) {
//     if(response.data) {
//         document.getElementById("questionContent").innerText = response.data.questionContent;
//     }
// })
// .catch(function (error) {
// 	console.log(error);
// }); 

function getRandomQuestion() {
	$.ajax({
		url: "http://localhost:1808/randomquestion",
		type: "GET",
		success: function(response) {
			if(response) {
				$("#questionContent").text(response.questionContent);
				$(".answer_btn").data("questionid", response.id);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

getRandomQuestion();

$("#otherQuestion").on("click", function() {
	getRandomQuestion();
});