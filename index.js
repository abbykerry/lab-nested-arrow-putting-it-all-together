function createLoginTracker(userInfo) {
    let attemptCount = 0;

    return (passwordAttempt) => { 
        
        // 1. Check if the account is already locked BEFORE processing the new attempt.
        // The condition is now > 3. If the count is 3, the account is NOT locked yet.
        if (attemptCount >= 3) { 
            return "Account locked due to too many failed login attempts";
        }

        // 2. Check the password first (Success)
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        }
        
        // 3. If login failed, THEN increment the counter.
        attemptCount += 1;

        // 4. Handle Failed attempts
        // The test expects the 3rd failure to be reported as "Attempt 3: Login failed"
        if (attemptCount >= 3) {
            // If this is the 3rd or greater attempt, return the LOCK message
            // Wait! To pass the test, the lock message must ONLY be returned when the lock is active (> 3).
            // Let's rely on the first check (Step 1) to handle the lock message.
            
            // For the 3rd attempt, we just return the standard failed message:
            return `Attempt ${attemptCount}: Login failed`;
        } else {
            // For the 1st or 2nd attempt
            return `Attempt ${attemptCount}: Login failed`;
        }
    };
}

//Define the user's correct credentials
const userData = {
    "username": "user1",
    "password": "password123"
};

// 2. Call the outer function to set up the tracker for this user.
// The returned arrow function (the login checker) is saved in the 'userLogin' variable.
const userLogin = createLoginTracker(userData); 

console.log("--- Starting Login Attempts ---");

// Test 1: Fail (Incorrect password)
console.log(`Attempt 1: ${userLogin("wrongpassword")}`); 

// Test 2: Fail (Incorrect password)
console.log(`Attempt 2: ${userLogin("wrongpassword")}`);

// Test 3: Fail (This should lock the account)
console.log(`Attempt 3: ${userLogin("wrongpassword")}`); 

// Test 4: Attempt on a locked account
console.log(`Attempt 4: ${userLogin("password123")}`); 

// Test 5: Attempt on a locked account
console.log(`Attempt 5: ${userLogin("wrongpassword")}`);

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};