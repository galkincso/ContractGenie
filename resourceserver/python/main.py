import ollama
from fastapi import FastAPI
from pydantic import BaseModel

class Question(BaseModel):
    context: str
    question: str

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/ai")
async def example(qu: Question):
    context = qu.context
    messages = [
        {"role": "system", "content": "Megbízható tudással rendelkezel szerződések terén és rövid, lényegretörő válaszokat adsz."},
        {"role": "user", "content": f"Itt van egy szerződés: \n{context}\nEnnek alapján, {qu.question}"}
    ]
    response = ollama.chat(
        model='llama3', 
        messages=messages,
        options={
          "max_tokens": 50,
            "top_p": 0.85,
            "top_k": 20,
            "temperature": 0.2
        }
    )
    return (response['message']['content'])
    

# context = """A teljesítési időpont 2024. január 1. A késedelmes teljesítés esetén a megrendelő kötbér fizetésére jogosult.
# A kötbér összege a szerződéses összeg 10%-a minden megkezdett késedelmi nap után."""
# messages= [
#     { "role": "system", "content": "Megbízható tudással rendelkezel szerződések terén és rövid, lényegretörő válaszokat adsz."},
#     {"role": "user", "content": f"Itt van egy szerződésrészlet: \n{context}\nEnnek alapján, mi a teljesítési időpont??"}
# ]
# messages.append(
#     {"role": "user", "content": "Mi történik késedelmes teljesítés esetén?"}
# )

# response = ollama.chat(
#     model='lama3', 
#     messages=messages,
#     options={
#         "max_tokens": 50,
#         "top_p": 0.85,
#         "top_k": 40,
#         "temperature": 0.2
#     }
# )

# print(response['message']['content'])