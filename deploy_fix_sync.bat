@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Simplify Firestore query to fix sync issues"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
