import bcrypt from "bcrypt";

import pool from "../db.js";
import createToken from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const existing = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);

    if (existing.rows.length) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    await pool.query(
      `
      INSERT INTO users(email,password)
      VALUES($1,$2)
      `,
      [email, hash],
    );

    res.status(201).json({
      message: "User registered",
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
      `,
      [email],
    );

    if (!result.rows.length) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = createToken(user);

    res.json({
      token,
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { register, login };
