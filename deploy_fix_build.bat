@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Resolve build errors in Analytics components"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
