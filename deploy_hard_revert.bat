@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Hard revert to pre-biweekly state"
"C:\Program Files\Git\cmd\git.exe" push origin main
