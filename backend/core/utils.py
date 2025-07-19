# backend/core/utils.py

from prediction import calculate_risk_score, get_risk_level

def predict_fraud(call_classifier, text, trust_score):
    try:
        result = call_classifier(text)[0]
        model_prob = result['score'] if result['label'] == 'LABEL_1' else 0.0
        alpha = 0.7
        fused_score = alpha * model_prob + (1 - alpha) * (1 - trust_score)
        label = "spam" if fused_score >= 0.5 else "ham"
        risk = get_risk_level(calculate_risk_score(fused_score))
        return label, round(model_prob, 4), round(fused_score, 4), risk
    except Exception as e:
        return "Error", 0.0, 0.0, str(e)
