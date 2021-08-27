# anna-extract
Tool to annotate documents for more precise OCR extraction

## Requirements
- [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/windows.html)
- [Tesseract-OCR](https://github.com/tesseract-ocr/tesseract)

## Environment Setup
- run `conda env create -f environment.yml`
## Usage
- run `uvicorn webserver:app`
- go to http://127.0.0.1:8000/ in your local browser to use the app

## Dev Notes
- when new libraries are installed, run `conda env export > environment.yml`