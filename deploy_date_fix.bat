@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Prevent crash in TransactionList due to invalid dates"
"C:\Program Files\Git\cmd\git.exe" push origin main
