
def calculate_risk_score(fused_score: float) -> float:
    return round(fused_score * 100, 2)

def get_risk_level(risk_score: float) -> str:
    if risk_score >= 80:
        return "High"
    elif risk_score >= 50:
        return "Medium"
    else:
        return "Low"

def predict_sms_spam(text: str) -> dict:
    from core.config import email_tokenizer, email_model  
    import torch
    import torch.nn.functional as F

    inputs = email_tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = email_model(**inputs)
        probs = F.softmax(outputs.logits, dim=1)
        spam_prob = probs[0][1].item()
        prediction = "Spam" if spam_prob >= 0.5 else "Ham"
    
    return {
        "text": text,
        "prediction": prediction,
        "spam_probability": spam_prob
    }
