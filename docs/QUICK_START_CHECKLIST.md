# Quick Start Checklist for New Setup

## ✅ Step-by-Step Setup

### 1. Pull Latest Code
```bash
git pull origin main
```

### 2. Verify Database Exists
```bash
ls -lh backend/database/recruitment.db
```
**Expected:** File size should be ~1.7MB  
**If 0 bytes or missing:** See step 7 below

### 3. Install Dependencies
```bash
# From project root
npm run install:all

# Or manually:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 4. Set Up Environment Variables
```bash
cd backend
cp .env.example .env
```
**Edit `.env` and add:**
- `JWT_SECRET=your_random_32_character_string`
- `OPENAI_API_KEY=your_openai_key` (optional for dashboard viewing)

### 5. Start Backend Server
```bash
cd backend
npm run dev
```
**Expected output:**
```
Server running on port 5000
Database connected successfully
```

### 6. Start Frontend Server (New Terminal)
```bash
cd frontend
npm run dev
```
**Expected output:**
```
ready - started server on 0.0.0.0:3000
```

### 7. Test the Application
1. Open browser: `http://localhost:3000`
2. Login with:
   - Email: `recruiter@futureworks.com`
   - Password: `recruiter123`
3. Navigate to Dashboard

---

## 🚨 If Dashboard Shows "Failed to load dashboard data"

### Quick Fix:
```bash
# 1. Check backend is running
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}

# 2. Check database has data
cd backend
sqlite3 database/recruitment.db "SELECT COUNT(*) FROM candidates;"
# Should return: 931

# 3. If returns 0, regenerate data:
python3 scripts/generate_candidates_v2.py

# 4. Restart backend
npm run dev
```

---

## 📋 Troubleshooting Checklist

- [ ] Node.js v18+ installed (`node --version`)
- [ ] Python 3.8+ installed (`python3 --version`)
- [ ] Database file exists and is 1.7MB
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] `.env` file exists in backend folder
- [ ] No CORS errors in browser console (F12)

---

## 📚 Full Documentation

- **Detailed Setup:** See `SETUP.md`
- **Troubleshooting:** See `docs/TROUBLESHOOTING.md`
- **Project Documentation:** See `docs/PROJECT_DOCUMENTATION.md`

