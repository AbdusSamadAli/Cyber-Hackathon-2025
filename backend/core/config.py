# backend/core/config.py

from pymongo import MongoClient
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    BertTokenizerFast, BertForSequenceClassification, pipeline
)
import whisper
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["spam_detection"]
collection = db["spam_logs"]
users_collection = db["users"]

# CORS origin
origins = ["http://localhost:5173"]

# Load models
email_tokenizer = AutoTokenizer.from_pretrained("rp23/email-spam-detector")
email_model = AutoModelForSequenceClassification.from_pretrained("rp23/email-spam-detector")

call_tokenizer = BertTokenizerFast.from_pretrained("./bert_call_model")
call_model = BertForSequenceClassification.from_pretrained("./bert_call_model")
call_classifier = pipeline("text-classification", model=call_model, tokenizer=call_tokenizer)

whisper_model = whisper.load_model("base")
