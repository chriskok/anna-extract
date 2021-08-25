from fastapi import  FastAPI
from fastapi.staticfiles import StaticFiles

# Use this to serve a public/index.html
from starlette.responses import FileResponse 
from starlette.responses import RedirectResponse

app = FastAPI()
app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get("/")
async def read_index():
    return RedirectResponse(url="/public/index.html")  