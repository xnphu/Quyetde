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

$(".answer_btn").on("click", function() {
	console.log($(this).data());
	$.ajax({
		url: "http://localhost:1808/answer",
		type: "POST",
		data: $(this).data(),
		success: function(response) {
			if(response.success) {
				window.location.href = "/";
			}
		},
		error: function(err) {
			console.log(err);
		}
	})
});

$("#result").on("click", function() {
	$.ajax({
		url: "http://localhost:1808/vote_result",
		type: "GET",
		success: function(response) {
			if(response.success) {
				window.location.href = "/result";
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
});