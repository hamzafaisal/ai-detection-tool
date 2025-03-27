import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface SiteSettings {
  siteTitle: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  writingAssistantTitle: string;
  copyright: string;
}

interface SiteStore {
  faqs: Faq[];
  features: Feature[];
  testimonials: Testimonial[];
  siteSettings: SiteSettings;
  loading: boolean;
  error: string | null;
  fetchSiteData: () => Promise<void>;
}

export const useSiteStore = create<SiteStore>()(
  devtools((set) => ({
    faqs: [],
    features: [],
    testimonials: [],
    siteSettings: {
      siteTitle: "",
      heroTitle: "",
      heroDescription: "",
      heroPrimaryButtonText: "",
      heroSecondaryButtonText: "",
      writingAssistantTitle: "",
      copyright: ""
    },
    loading: false,
    error: null,

    fetchSiteData: async () => {
      set({ loading: true, error: null });
      try {
        const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

        // Fetch all data in parallel
        const [faqsResponse, featuresResponse, testimonialsResponse, settingsResponse] = await Promise.all([
          fetch(`${STRAPI_API_URL}/api/faqs`, {
            headers: {
              'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${STRAPI_API_URL}/api/features`, {
            headers: {
              'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${STRAPI_API_URL}/api/testimonials`, {
            headers: {
              'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${STRAPI_API_URL}/api/site-settings`, {
            headers: {
              'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        // Check if any request failed
        if (![faqsResponse, featuresResponse, testimonialsResponse, settingsResponse].every(r => r.ok)) {
          throw new Error('Failed to fetch data from Strapi API');
        }

        // Get the data
        const [faqsData, featuresData, testimonialsData, settingsData] = await Promise.all([
          faqsResponse.json(),
          featuresResponse.json(),
          testimonialsResponse.json(),
          settingsResponse.json()
        ]);

        console.log('Fetched data:', {
          faqs: faqsData.data,
          features: featuresData.data,
          testimonials: testimonialsData.data,
          siteSettings: settingsData.data[0]
        });

        set({
          faqs: faqsData.data || [],
          features: featuresData.data || [],
          testimonials: testimonialsData.data || [],
          siteSettings: settingsData.data[0] || {
            siteTitle: "",
            heroTitle: "",
            heroDescription: "",
            heroPrimaryButtonText: "",
            heroSecondaryButtonText: "",
            writingAssistantTitle: "",
            copyright: ""
          },
          loading: false
        });
      } catch (error: unknown) {
        console.error('Error fetching site data:', error);
        set({
          error: error instanceof Error ? error.message : 'Failed to fetch site data',
          loading: false
        });
      }
    }
  }))
);
