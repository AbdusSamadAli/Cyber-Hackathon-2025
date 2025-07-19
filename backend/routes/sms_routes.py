# backend/routes/sms_routes.py

from fastapi import APIRouter, HTTPException
from models import SMSRequest
from prediction import predict_sms_spam, calculate_risk_score, get_risk_level
from core.config import collection

router = APIRouter()

@router.post("/predict/sms")
async def predict_sms(req: SMSRequest):
    try:
        result = predict_sms_spam(req.text)
        spam_prob = result["spam_probability"]
        alpha = 0.7
        fused_score = alpha * spam_prob + (1 - alpha) * (1 - req.trust_score)
        risk_score = calculate_risk_score(fused_score)
        risk_level = get_risk_level(risk_score)

        result.update({
            "fused_score": round(fused_score, 4),
            "risk_score": risk_score,
            "risk_level": risk_level
        })

        await collection.insert_one(result)
        return {k: v for k, v in result.items() if k != "_id"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats/spam-ham")
async def get_spam_ham_stats():
    try:
        spam_count = await collection.count_documents({"prediction": "Spam"})
        ham_count = await collection.count_documents({"prediction": "Ham"})
        return {"spam": spam_count, "ham": ham_count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
