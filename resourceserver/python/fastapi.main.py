# main.py

from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModelForCausalLM

app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B", use_auth_token="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")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B", use_auth_token="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")

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/qa")
async def question_answering(context: str, question: str):
    input_text = f"{context}\nQuestion: {question}\nAnswer:"
    
    # Tokenizálás
    inputs = tokenizer(input_text, return_tensors='pt')
    
    # Válasz generálása
    outputs = model.generate(**inputs)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
