import bcrypt from 'bcryptjs';
import { supabase } from './client'; // Assuming you have your supabase client setup correctly

// Define types for the User data structure
interface User {
    id: number;
    username: string;
    password?: string;
}

// Register a new user
export async function registerUser(username: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
        // Check if user already exists
        const { data: existingUser, error } = await supabase
            .from('User')
            .select('*')
            .eq('username', username)
            .single();

        // Handle the case where no user exists
        if (error && error.code === 'PGRST116') {
            // No existing user found, continue registration
        } else if (existingUser) {
            return { success: false, message: 'Username already exists' };
        } else if (error) {
            return { success: false, message: 'Database error occurred while checking for user' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        const { data: userData, error: insertError } = await supabase
            .from('User')
            .insert([
                {
                    username,
                    password: hashedPassword,
                },
            ])
            .select('*');

        if (insertError) {
            return { success: false, message: 'Failed to register user' };
        }

        // Type assertion to ensure the data returned is of the correct shape
        const userDataTyped = userData as unknown as User[];

        return { success: true, message: 'User registered successfully', user: { id: userDataTyped[0].id, username: userDataTyped[0].username } };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'Failed to register user' };
    }
}

// Authenticate a user
export async function loginUser(username: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
        // Find the user
        const { data: user, error } = await supabase
            .from('User')
            .select('*')
            .eq('username', username)
            .single();

        if (error && error.code === 'PGRST116') {
            // If no rows returned, handle this as an invalid username or password
            return { success: false, message: 'Invalid username or password' };
        }

        if (error || !user) {
            return { success: false, message: 'Invalid username or password' };
        }

        console.log({ user });
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return { success: false, message: 'Invalid username or password' };
        }

        return { success: true, message: 'User authenticated successfully', user: { id: user.id, username: user.username } };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Failed to authenticate user' };
    }
}

// Get user by ID
export async function getUserById(id: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
        const { data: user, error } = await supabase
            .from('User')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !user) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, message: 'User found successfully', user: { id: user.id, username: user.username } };
    } catch (error) {
        console.error('Get user error:', error);
        return { success: false, message: 'Failed to get user' };
    }
}
