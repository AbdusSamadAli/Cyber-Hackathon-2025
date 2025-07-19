# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import origins
from routes import auth_routes, sms_routes, email_routes, call_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(sms_routes.router)
app.include_router(email_routes.router)
app.include_router(call_routes.router)

@app.get("/")
def root():
    return {"message": "SMS Spam Detection API running"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Running directly with Python")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
