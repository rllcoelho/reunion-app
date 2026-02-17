// Test script to simulate frontend registration
const fetch = require("node-fetch");

async function testFrontendRegistration() {
  const userData = {
    username: "frontendtest2",
    email: "frontendtest2@example.com",
    password: "password123",
    fullName: "Frontend Test User 2",
  };

  try {
    console.log("Testing frontend registration...");
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
      return;
    }

    const result = await response.json();
    console.log("Registration successful!");
    console.log("Access token:", result.access_token);
    console.log("User:", result.user);
  } catch (error) {
    console.error("Network error:", error.message);
  }
}

testFrontendRegistration();
