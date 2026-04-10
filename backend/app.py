from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)


# ---------------- In-Memory Database ----------------
# Structure: { user_id_string: { id, email, password, username, character, xp, level, streak } }
MOCK_USERS = {}

@app.route("/")
def home():
    return "Flask + Mock Database backend working ✅"

# ---------------- Signup ----------------
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    username = data.get("username")
    character = data.get("character")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Check if email already exists
        for user in MOCK_USERS.values():
            if user.get("email") == email:
                return jsonify({"error": "Email already exists"}), 400

        user_id = str(uuid.uuid4())
        
        MOCK_USERS[user_id] = {
            "id": user_id,
            "email": email,
            "password": password, # Keeping password in mock DB for login check
            "username": username,
            "character": character,
            "xp": 0,
            "level": 1,
            "streak": 1,
        }

        return jsonify({
            "message": "Signup successful",
            "user_id": user_id
        }), 200

    except Exception as e:
        print(f"[SIGNUP ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 400

# ---------------- Login ----------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    try:
        user_id = None
        for uid, user in MOCK_USERS.items():
            if user.get("email") == email and user.get("password") == password:
                user_id = uid
                break

        if not user_id:
            return jsonify({"error": "Invalid email or password"}), 400

        return jsonify({
            "message": "Login successful",
            "user_id": user_id
        }), 200

    except Exception as e:
        print(f"[LOGIN ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 400

# ---------------- Get Profile ----------------
@app.route("/api/profile", methods=["GET"])
def profile():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    
    try:
        user = MOCK_USERS.get(user_id)
        
        # If profile doesn't exist, create a default one
        if not user:
            default_profile = {
                "id": user_id,
                "email": f"player_{user_id[:5]}@example.com",
                "password": "mockpassword",
                "username": "Player",
                "character": "explorer",
                "xp": 0,
                "level": 1,
                "streak": 1,
            }
            MOCK_USERS[user_id] = default_profile
            user = default_profile
            
        # Return profile without exposing the password
        profile_data = {k: v for k, v in user.items() if k != "password"}
        return jsonify(profile_data), 200
    except Exception as e:
        print(f"[PROFILE ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 400

# ---------------- Add XP ----------------
@app.route("/api/addxp", methods=["POST", "OPTIONS"])
def add_xp():
    # Handle preflight request
    if request.method == "OPTIONS":
        return "", 200
    
    data = request.json
    user_id = data.get("user_id")
    xp_delta = data.get("xp", 0)
    
    print(f"[ADD XP] Received request: user_id={user_id}, xp_delta={xp_delta}")
    
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    
    try:
        user = MOCK_USERS.get(user_id)
        if not user:
            print(f"[ADD XP] ERROR: No profile found for user_id {user_id}")
            return jsonify({"error": "Profile not found"}), 404
        
        current_xp = user.get("xp", 0)
        new_xp = max(0, current_xp + xp_delta)
        
        # Calculate new level based on XP (Level 1: 0-99, Level 2: 100-199, etc.)
        new_level = (new_xp // 100) + 1
        
        print(f"[ADD XP] Updating: {current_xp} + {xp_delta} = {new_xp}, Level: {new_level}")

        user["xp"] = new_xp
        user["level"] = new_level
        MOCK_USERS[user_id] = user

        return jsonify({"xp": new_xp, "level": new_level}), 200

    except Exception as e:
        print(f"[ADD XP] Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 400

# ---------------- Change Level ----------------
@app.route("/api/changeLevel", methods=["POST"])
def change_level():
    # In original code, this was reading user from supabase auth token which would fail locally.
    # Let's read from JSON if provided, otherwise act on a generic 'mock' action or fail gracefully
    data = request.json or {}
    user_id = data.get("user_id")
    
    if not user_id:
        # Fallback to the first user we find just to prevent crashes if frontend doesn't send user_id
        if MOCK_USERS:
            user_id = list(MOCK_USERS.keys())[0]
        else:
            return jsonify({"error": "user_id is required"}), 400

    try:
        user = MOCK_USERS.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        new_level = user.get("level", 1) + 1
        user["level"] = new_level
        MOCK_USERS[user_id] = user

        return jsonify({"level": new_level}), 200

    except Exception as e:
        print(f"[CHANGE LEVEL ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 400

# ---------------- Leaderboard ----------------
@app.route("/api/leaderboard", methods=["GET"])
def leaderboard():
    try:
        # If no users exist, provide some hardcoded mock data so the dashboard always looks alive
        if not MOCK_USERS:
            leaderboard_data = [
                {"position": 1, "username": "FinanceGuru_99", "xp": 1250, "level": 13},
                {"position": 2, "username": "BudgetMaster", "xp": 840, "level": 9},
                {"position": 3, "username": "StockShark", "xp": 620, "level": 7},
                {"position": 4, "username": "PennyPincher", "xp": 450, "level": 5},
                {"position": 5, "username": "CashKing", "xp": 310, "level": 4},
            ]
            return jsonify(leaderboard_data), 200

        # Sort MOCK_USERS by xp descending
        sorted_users = sorted(MOCK_USERS.values(), key=lambda x: x.get("xp", 0), reverse=True)
        
        # Add position to each entry, limit to 10
        leaderboard_data = []
        for index, profile in enumerate(sorted_users[:10], start=1):
            leaderboard_data.append({
                "position": index,
                "username": profile.get("username", "Unknown"),
                "xp": profile.get("xp", 0),
                "level": profile.get("level", 1)
            })
        
        return jsonify(leaderboard_data), 200
    except Exception as e:
        print(f"[LEADERBOARD ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)