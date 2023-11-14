const bcrypt = require("bcrypt");

async function testBcrypt() {
  try {
    // The password to hash and test
    const password = "password123";
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password
    console.log("Hashed password:", hashedPassword);

    // Compare the plain password against the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    // Output the result of the comparison
    if (isMatch) {
      console.log("The password is correct!");
    } else {
      console.log("The password is incorrect.");
    }
  } catch (error) {
    console.error("Error during bcrypt comparison:", error);
  }
}

// Run the test function
testBcrypt();
