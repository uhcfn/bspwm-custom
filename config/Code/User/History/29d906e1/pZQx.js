const destructionTasks = [
	'Переустанови систему. Без причины. Просто потому что можешь.',
	'Удали один старый файл, о котором давно забыл. Освободи место — в голове.',
	'Отключи интернет на сутки. Наблюдай, что начнёт зудеть.',
	'Промолчи весь день. Ни слова. Пусть мир говорит сам с собой.',
	'Сломай шаблон в своём графике. Встань в 4 утра и начни писать манифест.',
	'Отдай личную вещь незнакомцу. И не жди благодарности.',
	'Подделай документ и положи в общественное место. Смотри, как это разовьётся.',
];

function getRandomTask() {
	const shuffled = destructionTasks.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, 3);
}

const [t1, t2, t3] = getRandomTask();
document.getElementById('task1').textContent = t1;
document.getElementById('task2').textContent = t2;
document.getElementById('task3').textContent = t3;
