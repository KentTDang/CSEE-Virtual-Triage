#Create venv
For windows:
py -m venv myenv
.\myenv\Scripts\activate

For mac:
python3 -m venv myenv
source venv/bin/activate

#Install requirements:
pip install -r requirements.txt

#Running in /chat_backend run:
uv run -m uvicorn api.main:app --reload --port 8000
