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
				$(".answer_btn").data("questionid", response._id);
				$("#viewDetail").attr("href", "/question/"+response._id);
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

$(".answer_btn").on("click", function() {
	let questionId = $(this).data("questionid");
	$.ajax({
		url: "http://localhost:1808/answer",
		type: "POST",
		data: $(this).data(),
		success: function(response) {
			if(response.success) {
				window.location.href = "/question/"+questionId;
			}
		},
		error: function(err) {
			console.log(err);
		}
	})
});

