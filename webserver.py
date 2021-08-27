from fastapi import  FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
import json

# Use this to serve a public/index.html
from starlette.responses import FileResponse 
from starlette.responses import RedirectResponse

app = FastAPI()
app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get("/")
async def read_index():
    return RedirectResponse(url="/public/index.html")  

@app.post("/form")
def form_post(request: Request, my_hidden_input: str = Form(...)):
    parsed_data = json.loads(my_hidden_input)
    print(parsed_data)
    return parsed_data