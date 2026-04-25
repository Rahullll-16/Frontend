import Admin from "../models/Admin.js";
import Sensor from "../models/Sensor.js";

router.post("/login", async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { email, userId, password } = req.body;

  try {
    // ✅ admin + farmer dono handle
    const id = email || userId;

    const user = await Sensor.findOne({ userId: id });

    console.log("FOUND USER:", user);

    if (user && user.password === password) {
      return res.json({
        success: true,
        role: user.role,
        userId: user.userId,
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});