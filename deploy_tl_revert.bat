@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Revert TransactionList date formatting to original state"
"C:\Program Files\Git\cmd\git.exe" push origin main
