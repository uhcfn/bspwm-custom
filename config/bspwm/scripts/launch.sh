#!/bin/bash

# Папка с обоями
WALLPAPER_DIR="$HOME/Images"

# Выбираем случайный файл из папки (только файлы, без папок)
FILE=$(find "$WALLPAPER_DIR" -type f | shuf -n1)

# Устанавливаем обои
feh --no-fehbg --bg-fill "$FILE"
