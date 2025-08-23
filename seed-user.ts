import 'dotenv/config';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function main() {
  try {
    const email = 'user@nextmail.com';
    const password = '123456';
    const hashed = await bcrypt.hash(password, 10);

    const existing = await sql`SELECT * FROM users WHERE email=${email}`;
    if (existing.length > 0) {
      console.log('User exists, updating password hash...');
      await sql`UPDATE users SET password=${hashed} WHERE email=${email}`;
    } else {
      console.log('Creating user...');
      await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashed})`;
    }

    console.log('✅ User ready to login!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
