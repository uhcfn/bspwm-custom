#!/bin/bash

pacman -Syu --noconfirm

sudo pacman -S \
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

