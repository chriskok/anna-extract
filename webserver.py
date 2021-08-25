from fastapi import  FastAPI
from fastapi.staticfiles import StaticFiles

# Use this to serve a public/index.html
from starlette.responses import FileResponse 
from starlette.responses import RedirectResponse  # add this

app = FastAPI()
app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get("/")
async def read_index():
    # return FileResponse('public/index.html')  # remove this
    return RedirectResponse(url="/public/index.html")  # change to this