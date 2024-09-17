export const getWelcomeMessage = async () => {
    const response = await fetch("http://127.0.0.1:8000/welcome");
    if (!response.ok) {
      throw new Error("Failed to fetch welcome message");
    }
    const data = await response.json();
    return data.message;
  };


export const login = async (usernameOrEmail, password) => {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: usernameOrEmail,
        password: password,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    const data = await response.json();
    return data;  // returns the token and role
  };
  