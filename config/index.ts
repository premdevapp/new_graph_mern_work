import dotenv from 'dotenv';
dotenv.config();
export default {
  db: process.env.DB,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  allowedOrigins: ['http://localhost:3000', 'http://localhost:5000']
};
