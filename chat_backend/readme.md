#Create venv
You must have uv installed

run: uv suync
This will give you all the packages

if you'd like to add a package then run:
uv add <package name>

#Running in /chat_backend run:
uv run -m uvicorn api.main:app --reload --port 8000
