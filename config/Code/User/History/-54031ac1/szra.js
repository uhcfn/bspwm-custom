const tasks = {
	бред: [
		'Подружись с тенью от холодильника',
		'Проконтролируй рост пыли в углу',
		'Сделай вид, что ты паровоз, и иди по коридору',
		'Разговаривай с носком как с дипломатом',
		'Попробуй подышать сквозь ухо (в теории)',
		'Устрой допрос чайнику: зачем он кипит?',
		'Нарисуй свою тревогу и повесь в туалете',
		'Запиши альбом звуков холодильника',
	],
	полубред: [
		'Съешь яблоко, не открывая рта полностью',
		'Напиши письмо будущему себе, но ногой',
		'Прочти статью, меняя ударение в каждом слове',
		'Сделай уборку под драм-н-бэйс',
		'Сфотографируй обед как будто он модель',
		'Устрой онлайн-собрание с растениями',
	],
	'почти норм': [
		'Прогуляйся 10 минут, глядя только вверх',
		'Сделай зарядку с выражением лица ниндзя',
		"Пролистай фотоархив и выбери 'мем дня'",
		'Позвони другу и расскажи сон как новость',
		'Попробуй записать аудиодневник на 2 минуты',
		"Устрой себе 'мини-собеседование' перед зеркалом",
	],
};

function getRandomTasks(category, count = 5) {
	const pool = tasks[category];
	const shuffled = [...pool].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

document.getElementById('generateBtn').addEventListener('click', () => {
	const selectedFilter = document.querySelector(
		'input[name="filter"]:checked'
	).value;
	const result = getRandomTasks(selectedFilter);
	const list = document.getElementById('taskList');
	list.innerHTML = '';

	result.forEach(task => {
		const li = document.createElement('li');
		li.textContent = '— ' + task;
		list.appendChild(li);
	});
});
