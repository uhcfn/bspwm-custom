const destructionTasks = [
	'Переустанови систему. Без причины. Просто потому что можешь.',
	'Удали один старый файл, о котором давно забыл. Освободи место — в голове.',
	'Отключи интернет на сутки. Наблюдай, что начнёт зудеть.',
	'Промолчи весь день. Ни слова. Пусть мир говорит сам с собой.',
	'Сломай шаблон в своём графике. Встань в 4 утра и начни писать манифест.',
	'Отдай личную вещь незнакомцу. И не жди благодарности.',
	'Подделай документ и положи в общественное место. Смотри, как это разовьётся.',
];

function getRandomTasks() {
	return destructionTasks.sort(() => 0.5 - Math.random()).slice(0, 3);
}

const terminal = document.getElementById('terminal');
const input = document.getElementById('terminalInput');
let inChallenge = false;

function print(text = '') {
	const block = document.createElement('pre');
	block.textContent = `> ${text}`;
	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
}

function systemPrint(text = '') {
	const block = document.createElement('pre');
	block.textContent = text;
	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
}

input.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		e.preventDefault();
		const command = input.value.trim().toLowerCase();
		print(command);
		input.value = '';

		if (inChallenge) {
			if (command === 'agree' || command === 'disagree') {
				systemPrint('Ответ принят. Возврат...\n');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 3000);
			} else {
				systemPrint("Введите 'agree' или 'disagree'.");
			}
			return;
		}

		switch (command) {
			case 'help':
				systemPrint(
					'Доступные команды:\n  generate — получить план\n  clear — очистить экран\n  help — справка\n  quit — выйти (невозможно)'
				);
				break;
			case 'generate':
				const [t1, t2, t3] = getRandomTasks();
				systemPrint(
					`Твоя задача на неделю:\n— ${t1}\n— ${t2}\n— ${t3}\n\nВы принимаете вызов?\n> agree / disagree`
				);
				inChallenge = true;
				break;
			case 'clear':
				terminal.innerHTML = '';
				break;
			case 'quit':
				systemPrint('Никто не выходит.');
				break;
			default:
				systemPrint('Неизвестная команда. help для списка.');
		}
	}
});
