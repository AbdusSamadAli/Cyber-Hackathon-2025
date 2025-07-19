from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class SMSRequest(BaseModel):
    text: str
    trust_score: float

class SMSLog(BaseModel):
    text: str
    prediction: str
    spam_probability: float
    fused_score: float
    risk_score: float
    risk_level: str


class EmailLog(BaseModel):
    text: str
    prediction: str
    spam_probability: float
    fused_score: float
    risk_score: float
    risk_level: str

class CallInput(BaseModel):
    phone_number: str
    text: str
    trust_score: float
