let n = 0;
let i = 0;
let s = 0;
let t = 10;
let score = 0;
let current_question = {};
let questions = [];
let timer;
let indexLeft = [];

$(document).ready(function() {
	$.ajax({
		url: "data.json",
		method: 'GET',
		dataType: "json",
		success: function(response) {
			console.log(response);
			questions = response;
			hideQuestion();
			hideResult();

			initOnClickCallBack();
		}
	});
});

function initOnClickCallBack(){
	$("#10q-btn").click(function(event) {
		console.log("select 10q");
		resetGame();
		hideHome();
		showQuestion();
		startGame(10);
	});
	$("#20q-btn").click(function(event) {
		console.log("select 20q");
		resetGame();
		hideHome();
		showQuestion();
		startGame(20);
	});
	$("#ans-1").click(function(event) {
		onSelectChoice(0);
	});
	$("#ans-2").click(function(event) {
		onSelectChoice(1);
	});
	$("#ans-3").click(function(event) {
		onSelectChoice(2);
	});
	$("#ans-4").click(function(event) {
		onSelectChoice(3);
	});	
	$("#back-to-home").click(function(event) {
		hideResult();
		showHome();
	});
}

function resetGame(){
	
	i = 0;
	s = 0;
	t = 10;
	score = 0;
	indexLeft = new Array(questions.length);
	for (let i=0; i<questions.length; i++) {
		indexLeft[i] = i;
	}
}
function startGame(k){
	n = k;

	nextQuestion();
	timer = setInterval(function(){
		s++;
		if (s>=t) {
			s=0;
			nextQuestion();
		}
		updateTimer();
		
	}, 1000);
}

function onSelectChoice(j){
	if (j == current_question.ans) {
		score++;
		updateScore();
	}
	nextQuestion();
}

function nextQuestion(){
	s=0;
	i++;
	if (i>n) {
		endGame();
	}
	k = Math.floor(Math.random()*indexLeft.length);
	current_question = questions[indexLeft[k]];
	indexLeft.splice(k, 1);
	console.log("indexLeft", indexLeft);
	updateTimer();
	updateQuestion();
}

function endGame(){
	clearInterval(timer);
	hideQuestion();
	showResult();
	$("#score-result").text(score + "/" + n);
}
function updateQuestion(){
	$("#question-text").text(i+". "+current_question.question);
	$("#ans-1").text("1. " + current_question.choice[0]);
	$("#ans-2").text("2. " + current_question.choice[1]);
	$("#ans-3").text("3. " + current_question.choice[2]);
	$("#ans-4").text("4. " + current_question.choice[3]);
	$("#question-img").attr("src",current_question.img);
}
function updateScore(){
	$("#score").text(score);
}
function updateTimer() {
	$("#timer").text(s);
}
function hideHome(){
	$("#home").hide();
}
function showHome(){
	$("#home").show();
	$("#score").text(score);
}
function hideQuestion()
{
	$("#question").hide();
}
function showQuestion()
{
	$("#question").show();
}
function hideResult(){
	$("#result").hide();
}
function showResult(){
	$("#result").show();
}