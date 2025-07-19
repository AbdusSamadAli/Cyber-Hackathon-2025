# backend/routes/email_routes.py

from fastapi import APIRouter, HTTPException
import torch.nn.functional as F
import torch
from core.config import email_tokenizer, email_model, collection
from models import EmailInput, EmailLog
from prediction import calculate_risk_score, get_risk_level

router = APIRouter()

@router.post("/predict/email", response_model=EmailLog)
async def predict_email_spam(email: EmailInput):
    try:
        inputs = email_tokenizer(email.text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = email_model(**inputs)
            probs = F.softmax(outputs.logits, dim=1)
            spam_prob = probs[0][1].item()

        alpha = 0.7
        fused_score = alpha * spam_prob + (1 - alpha) * (1 - email.trust_score)
        risk_score = calculate_risk_score(fused_score)
        risk_level = get_risk_level(risk_score)
        label = "spam" if fused_score >= 0.5 else "not spam"

        result_data = {
            "text": email.text,
            "prediction": label,
            "spam_probability": round(spam_prob, 4),
            "fused_score": round(fused_score, 4),
            "risk_score": round(risk_score, 2),
            "risk_level": risk_level
        }

        inserted = await collection.insert_one(result_data)
        result_data["_id"] = inserted.inserted_id
        return EmailLog(**result_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
