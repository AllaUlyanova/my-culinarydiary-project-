@echo off
node "%~dp0serve.mjs" 8767
if errorlevel 1 pause
