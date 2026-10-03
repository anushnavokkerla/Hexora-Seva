"""Hexora Seva demo backend (FastAPI). In-memory only. Sample data, no real government calls."""
import asyncio, random
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Hexora Seva API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

STATUS = ["Submitted", "Documents Verified", "Under Review", "Approved"]
APPS = {
    "HX-2026-10482": {"svc": "income", "name": "Lakshmi", "st": 1},
    "HX-2026-22017": {"svc": "pension", "name": "Ramaiah", "st": 2},
    "HX-2026-33590": {"svc": "ration", "name": "Fatima", "st": 3},
}
FEEDBACK, AUDIT = [], []

SMS_INFO = {
    "INCOME": "Income Certificate: Aadhaar, address proof, income declaration. Fee Rs30-60. Mee Seva, Main Road, 10-5.",
    "RATION": "Ration Card: Aadhaar of all members, address proof, family photo. Free. Mee Seva, Main Road, 10-5.",
    "BIRTH": "Birth Certificate: hospital slip, parents' Aadhaar, marriage proof. Free within 21 days.",
    "AADHAAR": "Aadhaar Update: current Aadhaar, new address proof, working mobile. Fee Rs50.",
    "PENSION": "Old-Age Pension: Aadhaar, age proof, bank passbook. Free. Apply at Mandal office.",
    "CASTE": "Caste Certificate: Aadhaar, father's caste certificate, school certificate. Fee Rs30.",
}

def log(msg): AUDIT.append({"time": datetime.now().isoformat(timespec="seconds"), "event": msg})

class Submit(BaseModel):
    svc: str
    name: str

class Feedback(BaseModel):
    helpful: bool
    comment: str = ""

class Sms(BaseModel):
    from_number: str
    text: str

@app.get("/api/health")
def health(): return {"ok": True}

@app.post("/api/ocr")
async def ocr():
    """Simulated OCR. Swap in tesseract / a real OCR service later."""
    await asyncio.sleep(0.3)
    return {"name": "Ravi Kumar", "no": "INC-82931", "inc": "₹80,000", "date": "12/08/2026"}

@app.post("/api/applications")
async def submit(d: Submit):
    """Mock government endpoint (submitToGovAPI)."""
    await asyncio.sleep(1.5)
    app_id = f"HX-2026-{random.randint(10000, 99999)}"
    APPS[app_id] = {"svc": d.svc, "name": d.name, "st": 0}
    log(f"Application {app_id} submitted"); log(f"Document deleted after submission ({app_id})")
    return {"ok": True, "id": app_id}

@app.get("/api/applications")
def list_apps(): return APPS

@app.get("/api/applications/{app_id}")
def track(app_id: str):
    a = APPS.get(app_id.upper())
    if not a: raise HTTPException(404, "Application not found")
    return {**a, "status": STATUS[a["st"]]}

@app.patch("/api/applications/{app_id}")
def set_status(app_id: str, st: int):
    """Admin: change status (0-3)."""
    if app_id not in APPS or not 0 <= st <= 3: raise HTTPException(400, "Bad request")
    APPS[app_id]["st"] = st; log(f"{app_id} -> {STATUS[st]}")
    return APPS[app_id]

@app.post("/api/feedback")
def feedback(f: Feedback):
    FEEDBACK.append(f.model_dump()); return {"ok": True}

@app.get("/api/admin/summary")
def summary():
    up = sum(1 for f in FEEDBACK if f["helpful"])
    return {"applications": len(APPS), "feedback": len(FEEDBACK), "helpful": up, "audit": AUDIT[-20:]}

@app.post("/api/sms")
def sms(m: Sms):
    """Inbound SMS webhook. Connect an SMS gateway (e.g. Twilio, MSG91) to POST here."""
    word = m.text.strip().upper()
    if word in SMS_INFO: return {"reply": SMS_INFO[word]}
    a = APPS.get(word)
    if a: return {"reply": f"{word}: {STATUS[a['st']]}."}
    return {"reply": "Sorry, we did not understand. Text INCOME, RATION, BIRTH, AADHAAR, PENSION or CASTE."}
