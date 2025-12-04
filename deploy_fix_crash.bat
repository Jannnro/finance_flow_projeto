@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Add safety checks for date parsing to prevent crash"
"C:\Program Files\Git\cmd\git.exe" push origin main
