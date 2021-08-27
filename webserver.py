from fastapi import  FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
import json

# Use this to serve a public/index.html
from starlette.responses import FileResponse 
from starlette.responses import RedirectResponse

from processing import *

app = FastAPI()
app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get("/")
async def read_index():
    return RedirectResponse(url="/public/index.html")  

@app.post("/form")
def form_post(request: Request, my_hidden_input: str = Form(...)):
    parsed_data = json.loads(my_hidden_input)
    curr_image_path = "public/data/service_call.jpg"
    print(parsed_data)

    return_dict = {}
    for label in parsed_data:
        cropped_image = crop_image(parsed_data[label], curr_image_path)
        return_dict[label] = ocr_on_image(cropped_image)

    return return_dict