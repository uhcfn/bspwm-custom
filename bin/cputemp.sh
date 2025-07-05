#!/usr/bin/env bash

# Вытаскиваем температуру через sensors и grep
sensors | grep "Core 0" | awk '{print int($3)}'
