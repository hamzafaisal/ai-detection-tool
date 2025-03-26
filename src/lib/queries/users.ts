import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Register a new user
export async function registerUser(username: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return { success: true, user: { id: user.id, username: user.username } };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to register user' };
  }
}

// Authenticate a user
export async function loginUser(username: string, password: string) {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: 'Invalid username or password' };
    }

    return { success: true, user: { id: user.id, username: user.username } };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Failed to authenticate user' };
  }
}

// Get user by ID
export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, user: { id: user.id, username: user.username } };
  } catch (error) {
    console.error('Get user error:', error);
    return { success: false, message: 'Failed to get user' };
  }
}
