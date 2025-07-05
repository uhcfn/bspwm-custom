const tasks = {
	бред: [
		'Подружись с тенью от холодильника',
		'Проконтролируй рост пыли в углу',
		'Сделай вид, что ты паровоз',
		'Разговаривай с носком как с дипломатом',
		'Запиши альбом звуков холодильника',
	],
	полубред: [
		'Напиши письмо себе, но ногой',
		'Прочти статью, меняя ударения',
		'Сделай уборку под драм-н-бэйс',
		'Сфотографируй обед как будто он модель',
	],
	'почти норм': [
		'Прогуляйся, глядя только вверх',
		'Сделай зарядку с лицом ниндзя',
		'Позвони другу и расскажи сон как новость',
	],
};

function getRandomTasks(category, count = 3) {
	const pool = tasks[category];
	const shuffled = [...pool].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

document.getElementById('generateBtn').addEventListener('click', () => {
	const level = document.getElementById('absurdityLevel').value;
	const result = getRandomTasks(level);
	const list = document.getElementById('taskList');
	list.innerHTML = '';

	result.forEach(task => {
		const li = document.createElement('li');
		li.textContent = '— ' + task;
		list.appendChild(li);
	});
});
