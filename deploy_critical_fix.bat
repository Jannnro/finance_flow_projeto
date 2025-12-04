@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Critical crash due to missing date in transactions"
"C:\Program Files\Git\cmd\git.exe" push origin main
