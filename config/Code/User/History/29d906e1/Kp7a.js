const destructionTasks = [
	'Укради у системы хоть 5 минут. Не дай ей выиграть.',
	'Засни на крыше. Проснись — и вспомни кто ты.',
	'Удали один файл, который казался тебе важным.',
	'Заставь себя выйти из привычного. Не думай — сделай.',
	'Сделай что-то не ради пользы. Ради бунта.',
	'Нарушь план. Перепиши маршрут. Перезагрузи реальность.',
	'Разбей шаблон. Пусть даже словом. Пусть даже шёпотом.',
];

document.getElementById('generateBtn').addEventListener('click', () => {
	const task =
		destructionTasks[Math.floor(Math.random() * destructionTasks.length)];
	document.getElementById('weeklyTask').innerHTML = `<p>🗡️ ${task}</p>`;
});
