const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000"; // Flask backend URL

export type UserProfile = {
  email: string;
  username: string;
  character: string;
  xp: number;
  level: number;
  streak: number;
};

export type AuthResponse = {
  user_id: string;
};

// ---------------- Signup ----------------
export async function signup(
  email: string,
  password: string,
  username: string,
  character: string,
  streak: number,
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username, character, streak }),
    });

    if (!response.ok) {
      throw new Error("Signup failed from server");
    }

    const data = await response.json();
    return { user_id: data.user_id };
  } catch (error) {
    console.warn("Backend unavailable, using mock sign up fallback.", error);
    return { user_id: "mock-user-" + Date.now() };
  }
}

// ---------------- Login ----------------
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed from server");
    }

    const data = await response.json();
    return { user_id: data.user_id };
  } catch (error) {
    console.warn("Backend unavailable, using mock login fallback.", error);
    return { user_id: "mock-user-123" };
  }
}

// ---------------- Get Profile ----------------
export async function getProfile(userId: string): Promise<UserProfile> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profile?user_id=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile from server");
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable, using mock profile fallback.", error);
    return {
      email: "mock@example.com",
      username: "Mock Player",
      character: "explorer",
      xp: 150,
      level: 2,
      streak: 5
    };
  }
}

// ---------------- Add XP ----------------
export async function addXP(userId: string, xp: number): Promise<{ xp: number }> {
  console.log("Calling addXP API:", { userId, xp });

  try {
    const response = await fetch(`${API_BASE_URL}/api/addxp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, xp }),
    });

    if (!response.ok) {
        throw new Error("Failed to add XP to server");
    }

    const result = await response.json();
    console.log("AddXP API response:", result);
    return result;
  } catch (error) {
    console.warn("Backend unavailable, using mock addXP fallback.", error);
    return { xp: xp + 150 }; // Just adding on top of standard mock XP
  }
}

// ---------------- Change Level ----------------
export async function changeLevel(): Promise<{ level: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/changeLevel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Adding mock body so standalone mock backend can pick it up
      body: JSON.stringify({ user_id: "mock-fallback" })
    });

    if (!response.ok) {
       throw new Error("Failed to change level from server");
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable, using mock changeLevel fallback.", error);
    return { level: 3 };
  }
}

// ---------------- Leaderboard ----------------
export async function getLeaderboard(): Promise<
  Array<{ position: number; username: string; xp: number; level: number }>
> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard from server");
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable, using mock leaderboard fallback.", error);
    return [
      {"position": 1, "username": "MockMaster", "xp": 9999, "level": 100},
      {"position": 2, "username": "FallbackFinancier", "xp": 8000, "level": 80},
      {"position": 3, "username": "OfflineOracle", "xp": 7500, "level": 75},
    ];
  }
}