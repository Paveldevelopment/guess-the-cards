export interface RandomWordResponse {
  word: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchRandomWord(): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      headers: { 'X-Api-Key': API_KEY },
    });
    console.log('API_KEY', API_KEY);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data: RandomWordResponse = await response.json();
    return data.word;
  } catch (error) {
    console.error('Error fetching random word:', error);
    throw error;
  }
}
