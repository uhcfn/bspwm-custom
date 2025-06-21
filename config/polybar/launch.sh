#!/usr/bin/env bash

# Terminate already running bar instances
killall -q polybar

# === Загрузка переменных интерфейсов ===
source ~/.config/polybar/interfaces.sh

# Логируем запуск
echo "---" | tee -a /tmp/polybar1.log /tmp/polybar2.log

# Запуск панели top (или другой, по твоему конфигу)
polybar top -r >>/tmp/polybar1.log 2>&1 & disown

echo "Bars launched..."
