from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import spacy
import os

# Initialize SpaCy model
nlp = spacy.blank("si")

app = FastAPI()

def load_bad_word(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            bad_words = set(line.strip() for line in file)
        return bad_words
    except FileNotFoundError:
        print(f"File is not found: {filename}")
        return set()
    except UnicodeDecodeError as e:
        print(f"Error decoding file {filename}: {e}")
        return set()

Sinhala_Bad_Word = load_bad_word('Data/SinhalaBWords.txt')
Singlish_Bad_Word = load_bad_word('Data/SinglishBWords.txt')

class TextData(BaseModel):
    text: str

@app.post("/detect_b_words")
def detect_b_words(data: TextData):
    doc = nlp(data.text)

    for token in doc:
        if token.text in Sinhala_Bad_Word or token.text in Singlish_Bad_Word:
            return {"bad_word_contain" : True}
    
    return {"bad_word_contain": False}
