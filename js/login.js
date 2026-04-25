import Admin from "../models/Admin.js";
import Sensor from "../models/Sensor.js";

router.post("/login", async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { email, userId, password } = req.body;

  try {
    let user;

    // 🔴 ADMIN LOGIN (email se)
    if (email) {
      user = await Sensor.findOne({ userId: email });
    }

    // 🟢 FARMER LOGIN (userId se)
    if (userId) {
      user = await Sensor.findOne({ userId });
    }

    console.log("USER:", user);

    if (user && user.password === password) {
      return res.json({
        success: true,
        role: user.role,
        userId: user.userId,
      });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});