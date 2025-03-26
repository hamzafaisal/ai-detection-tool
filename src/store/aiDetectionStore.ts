import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface DetectedText {
  id: number;
  content: string;
  score: number | null;
  isAI: boolean | null;
  userId: number;
  created_at: string;
}

interface AIDetectionState {
  detectedTexts: DetectedText[];
  isLoading: boolean;
  error: string | null;
  fetchDetectedTexts: () => Promise<void>;
  detectAIContent: (content: string) => Promise<void>;
  deleteDetectedText: (id: number) => Promise<void>;
}

const aiDetectionStore = (set: any, get: any): AIDetectionState => ({
  detectedTexts: [],
  isLoading: false,
  error: null,

  fetchDetectedTexts: async () => {
    const userId = Cookies.get('user_id');
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/detected-texts');
      if (response.ok) {
        const data = await response.json();
        set({ detectedTexts: data });
      } else {
        throw new Error('Failed to fetch detected texts');
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  detectAIContent: async (content: string) => {
    const userId = Cookies.get('user_id');
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      // Step 1: Call the detection API
      const detectionResponse = await fetch(`${process.env.NEXT_PUBLIC_UNDETECTABLE_API_URL}/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          key: process.env.NEXT_PUBLIC_UNDETECTABLE_API_KEY,
          model: 'xlm_ud_detector',
          retry_count: 0
        }),
      });

      if (!detectionResponse.ok) {
        throw new Error('Failed to start AI detection');
      }

      const detectionResult = await detectionResponse.json();
      const detectionId = detectionResult.id;

      // Step 2: Poll the query API for results
      let queryResult;
      let attempts = 0;
      const maxAttempts = 10;
      const delay = 2000; // 2 seconds

      while (attempts < maxAttempts) {
        const queryResponse = await fetch(`${process.env.NEXT_PUBLIC_UNDETECTABLE_API_URL}/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: detectionId
          }),
        });

        if (!queryResponse.ok) {
          throw new Error('Failed to fetch AI detection results');
        }

        queryResult = await queryResponse.json();

        if (queryResult.status === 'done') {
          break;
        }

        await new Promise(resolve => setTimeout(resolve, delay));
        attempts++;
      }

      if (queryResult.status !== 'done') {
        throw new Error('AI detection timed out');
      }

      // Save to database via API
      const response = await fetch('/api/detected-texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          score: queryResult.result_details.human,
          isAI: queryResult.result_details.human < 50,
        }),
      });

      if (response.ok) {
        // Refresh the list of detected texts
        get().fetchDetectedTexts();
      } else {
        throw new Error('Failed to save detection result');
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDetectedText: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/detected-texts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted text from the list
        const currentTexts = get().detectedTexts;
        set({
          detectedTexts: currentTexts.filter((text: DetectedText) => text.id !== id),
        });
      } else {
        throw new Error('Failed to delete detected text');
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});

const useAIDetectionStore = create<AIDetectionState>()(
  devtools(
    persist(aiDetectionStore, {
      name: 'ai-detection-storage',
      partialize: (state: AIDetectionState) => ({
        detectedTexts: state.detectedTexts,
      }),
    })
  )
);

export default useAIDetectionStore;
