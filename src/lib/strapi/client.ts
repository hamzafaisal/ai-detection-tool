import axios from 'axios';

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const strapiApiToken = process.env.STRAPI_API_TOKEN || '';

const strapiApi = axios.create({
  baseURL: `${strapiBaseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${strapiApiToken}`,
  },
});

export const fetchLandingPageContent = async () => {
  try {
    const response = await strapiApi.get('/landing-page?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching landing page content:', error);
    throw error;
  }
};

export const fetchHeroSection = async () => {
  try {
    const response = await strapiApi.get('/hero-section?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    throw error;
  }
};

export const fetchFeatures = async () => {
  try {
    const response = await strapiApi.get('/features?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

export default strapiApi;
