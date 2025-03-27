import { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "./client";

export interface DetectedText {
    id: number;
    content: string;
    score: number | null;
    isAI: boolean | null;
    userId: number;
    created_at: string;
}

// Fetch detected texts for a user
// Fetch detected texts for a user
// Fetch detected texts for a user
export async function getDetectedTexts(userId: string): Promise<{ success: boolean; message: string; data?: DetectedText[]; error?: string }> {
    try {
        // Type the response structure explicitly without the complex type argument
        const { data, error } = await supabase
            .from('DetectedText')
            .select('*')
            .eq('userId', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.log({ error });
            return { success: false, message: "Failed to fetch detected texts", error: error.message };
        }
        console.log({ data });

        return { success: true, message: "Detected texts fetched successfully", data };
    } catch (error) {
        console.error('Error fetching detected texts:', error);
        return { success: false, message: 'Failed to fetch detected texts' };
    }
}


// Create a new detected text
export async function createDetectedText(
    userId: string,
    content: string,
    score: number | null,
    isAI: boolean | null
): Promise<{ success: boolean; message: string; data?: DetectedText; error?: string }> {
    try {
        const { data, error } = await supabase
            .from('DetectedText')
            .insert([
                {
                    content,
                    score,
                    isAI,
                    userId,
                },
            ])
            .single();

        if (error) {
            return { success: true, message: "Failed to create detected text" };
        }

        return { success: true, message: "Detected text created successfully", data };
    } catch (error) {
        console.error('Error creating detected text:', error);
        return { success: false, message: 'Failed to create detected text' };
    }
}

// Delete a detected text by ID
export async function deleteDetectedText(id: number): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('DetectedText')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting detected text:', error);
        return { success: false, error: 'Failed to delete detected text' };
    }
}
