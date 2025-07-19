# backend/routes/auth_routes.py

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from models import User, Token
from auth import hash_password, verify_password, create_access_token, decode_access_token
from core.config import users_collection

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.post("/signup", response_model=Token)
async def signup(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed_pw = hash_password(user.password)
    users_collection.insert_one({"email": user.email, "hashed_password": hashed_pw})
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_data = users_collection.find_one({"email": form_data.username})
    if not user_data or not verify_password(form_data.password, user_data["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    token = create_access_token({"sub": user_data["email"]})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/profile")
async def get_profile(token: str = Depends(oauth2_scheme)):
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return {"email": email}
