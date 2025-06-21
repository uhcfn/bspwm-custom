#!/usr/bin/env bash

# Определение имени wi-fi интерфейса
WIRELESS_INTERFACE=$(ip link | awk -F: '$0 !~ "lo|vir|tun|docker|^[^0-9]"{print $2}' | grep -E 'wl|wlan|wifi' | head -n1 | tr -d ' ')
WIRED_INTERFACE=$(ip link | awk -F: '$0 !~ "lo|vir|tun|docker|^[^0-9]"{print $2}' | grep -E 'enp|eno|eth' | head -n1 | tr -d ' ')

export WIRELESS_INTERFACE
export WIRED_INTERFACE
