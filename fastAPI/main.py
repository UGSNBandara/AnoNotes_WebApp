from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import spacy
from fastapi.middleware.cors import CORSMiddleware
import pickle


with open("fastAPI\models\singlish_comment_classifier_v1.pkl", "rb") as file:
    singlish_comment_classifier_v1 = pickle.load(file)

with open("fastAPI\models\sinhala_comment_classifier_v1.pkl", "rb") as file:
    sinhala_comment_classifier_v1 = pickle.load(file)

# Initialize SpaCy model
nlp = spacy.blank("si")

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

def detect_sinhala_english_text(text):
    
    english_range = range(0x0041, 0x007B)

    detecting_count = 0
    
    for char in text:
        if char != ' ':
            if ord(char) in english_range:
                detecting_count +=1
            else:
                detecting_count -=1
    
    if(detecting_count<0):
        return 0 #return 0 if the text is in sinhala
    elif(detecting_count>=0):
        return 1 # return 1 if the text is in english 
                 # if it 0 then also check the english.. Assuming commenter do not enter harmfull massage and harmless massage using separated laungage

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

