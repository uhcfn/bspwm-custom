#!/bin/bash

# Проверка на root
if [[ $EUID -ne 0 ]]; then
   echo "Пожалуйста, запускай скрипт с sudo или от root"
   exit 1
fi

echo "📦 Обновляем систему..."
pacman -Syu --noconfirm

echo "📦 Устанавливаем необходимые пакеты..."

sudo pacman -S --noconfirm --needed \
  xorg-server xorg-xinit bspwm sxhkd \
  alacritty polybar rofi picom \
  dunst feh \
  pamixer pavucontrol pulseaudio pulseaudio-alsa alsa-utils \
  ranger lsd htop zip unzip \
  scrot slop \
  ttf-jetbrains-mono-nerd \
  git wget xclip sudo networkmanager openssh \
  flameshot scrot redshift tree bat htop unrar xarchiver p7zip zathura \
  lxappearance papirus-icon-theme


echo "✅ Установка завершена."
echo "🚀 Теперь можешь копировать свои конфиги и запускать bspwm через startx"
