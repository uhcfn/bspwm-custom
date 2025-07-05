const tasks = {
	'почти норм': [
		'Погладить кота соседа через окно',
		'Сделать вид, что ты проводишь деловую встречу с зеркалом',
		'Сфотографировать чайник в стиле нуар',
		'Переименовать папки на рабочем столе в философские концепции',
		'Завести будильник на 03:33 и назвать его "ритуал"',
	],
	полубред: [
		'Разговаривать с бананом как с начальником',
		'Отправить письмо в никуда с мыслью дня',
		'Сделать карту города, где вместо улиц — эмоции',
		'Приклеить кнопку ‘Пауза’ на холодильник',
		'Переубедить кактус, что он не одинок',
	],
	бред: [
		'Построить ловушку для времени из скотча и колпачков',
		'Убежать от своего отражения (по-настоящему постараться)',
		'Назначить встречу случайному числу',
		'Устроить перепись облаков, дать каждому имя',
		'Попытаться обучить клавиатуру чувствам',
	],
};

const generateBtn = document.getElementById('generateBtn');
const taskList = document.getElementById('taskList');

generateBtn.addEventListener('click', () => {
	const level = document.querySelector('input[name="absurdity"]:checked').value;
	const chosen = tasks[level];
	const shuffled = chosen.sort(() => 0.5 - Math.random());
	const selected = shuffled.slice(0, 3);

	taskList.innerHTML = '';
	selected.forEach(task => {
		const li = document.createElement('li');
		li.textContent = '— ' + task;
		taskList.appendChild(li);
	});
});

// Модалка
const enterDark = document.getElementById('enterDark');
const modal = document.getElementById('confirmationModal');
const confirmInput = document.getElementById('confirmInput');

enterDark.addEventListener('click', () => {
	modal.classList.remove('hidden');
	confirmInput.value = '';
	confirmInput.focus();
});

confirmInput.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		const val = confirmInput.value.trim().toLowerCase();
		if (val === 'yes') {
			window.location.href = 'plan.html';
		} else if (val === 'no') {
			modal.classList.add('hidden');
		}
	}
});
