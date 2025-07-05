const destructionTasks = [
	'Переустанови систему. Без причины. Просто потому что можешь.',
	'Удали один старый файл, о котором давно забыл. Освободи место — в голове.',
	'Отключи интернет на сутки. Наблюдай, что начнёт зудеть.',
	'Промолчи весь день. Ни слова. Пусть мир говорит сам с собой.',
	'Сломай шаблон в своём графике. Встань в 4 утра и начни писать манифест.',
	'Отдай личную вещь незнакомцу. И не жди благодарности.',
	'Подделай документ и положи в общественное место. Смотри, как это разовьётся.',
];

const terminal = document.getElementById('terminal');
const inputBlock = document.getElementById('input-block');
const inputField = document.getElementById('terminalInput');
const inputContainer = document.getElementById('input-container');

let inChallenge = false;

function print(text = '') {
	const block = document.createElement('pre');
	block.textContent = text;
	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
}

function showInput() {
	inputContainer.style.display = 'block';
	inputField.focus();
}

function hideInput() {
	inputContainer.style.display = 'none';
}

function getRandomTask() {
	return destructionTasks[Math.floor(Math.random() * destructionTasks.length)];
}

function processCommand(command) {
	hideInput();
	setTimeout(() => {
		print(`user@razgrom:~$ ${command}`);

		if (inChallenge) {
			if (command === 'agree' || command === 'disagree') {
				print('Ответ принят. Возврат...');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 3000);
			} else {
				print("Введите 'agree' или 'disagree'.");
				setTimeout(() => showInput(), 1000);
			}
			return;
		}

		switch (command) {
			case 'help':
				print(
					'Доступные команды:\n  generate — получить план\n  clear — очистить экран\n  help — справка\n  quit — выйти (невозможно)'
				);
				break;
			case 'generate':
				const t = getRandomTask();
				print(
					`Твоя задача на неделю:\n— ${t}\n\nВы принимаете вызов?\n> agree / disagree`
				);
				inChallenge = true;
				break;
			case 'clear':
				terminal.innerHTML = '';
				break;
			case 'quit':
				print('Никто не выходит.');
				break;
			default:
				print('Неизвестная команда. help для списка.');
		}

		setTimeout(() => showInput(), 1000);
	}, 1000);
}

inputField.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		const command = inputField.value.trim();
		inputField.value = '';
		processCommand(command);
	}
});

window.onload = () => {
	showInput();
};
