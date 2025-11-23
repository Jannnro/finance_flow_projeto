@echo off
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix: Emergency rollback of CreditCard icon to fix crash"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
