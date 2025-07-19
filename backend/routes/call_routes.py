# backend/routes/call_routes.py

from fastapi import APIRouter, UploadFile, File, Request, HTTPException
import tempfile
from models import CallInput
from core.config import call_classifier, whisper_model, collection
from core.utils import predict_fraud

router = APIRouter()

@router.post("/predict/call")
async def predict_call_spam(call: CallInput):
    try:
        label, prob, fused, risk = predict_fraud(call_classifier, call.text, call.trust_score)
        if label == "spam":
            await collection.insert_one({
                "type": "call",
                "phone_number": call.phone_number,
                "transcript": call.text,
                "prediction": label,
                "spam_probability": prob,
                "fused_score": fused,
                "risk_level": risk,
                "user_trust_score": call.trust_score
            })
        return {
            "text": call.text,
            "label": label,
            "confidence": prob,
            "risk_score": fused,
            "risk_level": risk,
            "user_trust_score": call.trust_score
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/call/audio")
async def predict_audio(audio: UploadFile = File(...), trust_score: float = 0.5):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await audio.read())
            tmp_path = tmp.name

        result = whisper_model.transcribe(tmp_path)
        transcript = result["text"]
        label, prob, fused, risk = predict_fraud(call_classifier, transcript, trust_score)

        if label == "spam":
            await collection.insert_one({
                "type": "call_audio",
                "transcript": transcript,
                "prediction": label,
                "spam_probability": prob,
                "fused_score": fused,
                "risk_level": risk,
                "user_trust_score": trust_score
            })

        return {
            "transcript": transcript,
            "label": label,
            "confidence": prob,
            "risk_score": fused,
            "risk_level": risk,
            "user_trust_score": trust_score
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/report/spam")
async def report_spam(request: Request):
    try:
        data = await request.json()
        phone_number = data.get("phone_number")
        transcript = data.get("transcript")

        if not phone_number or not transcript:
            raise HTTPException(status_code=400, detail="Missing phone number or transcript")

        await collection.insert_one({
            "type": "report",
            "phone_number": phone_number,
            "transcript": transcript,
            "reported": True
        })

        return {"message": "Spam number reported successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
