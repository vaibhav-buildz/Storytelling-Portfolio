import PyPDF2
import sys

def extract_text(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        text = str(e)
    return text

files = [
    "7a9e3a535a072e26ee7c9829e10894bc.pdf",
    "aaf655ea3e67ba1e894db5705f494c31.pdf",
    "Certificate.pdf"
]

for file in files:
    print(f"--- {file} ---")
    print(extract_text(file)[:1000])
    print("\n")
