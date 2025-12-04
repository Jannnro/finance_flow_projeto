@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Revert: Remove bi-weekly balance feature to fix crash"
"C:\Program Files\Git\cmd\git.exe" push origin main
