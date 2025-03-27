import { useState } from 'react';
import Button from '@/components/common/Button';

interface Feature {
  name: string;
  description?: string;
  free?: boolean;
  monthly?: boolean;
  yearly?: boolean;
}

interface Plan {
  name: string;
  price: string;
  billing: string;
  credits: number;
  features: Feature[];
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: 'Free',
    billing: 'Forever',
    credits: 200,
    features: [
      { name: 'Passes AI detectors' },
      { name: 'High quality, legible content' },
      { name: 'Watermark and future proof' },
      { name: 'Writing level matching' },
      { name: 'API compatible', free: false },
      { name: 'Unlimited Human Auto Typer', free: false },
      { name: 'Unlimited AI Detecting', free: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Monthly',
    price: '$19',
    billing: 'per month',
    credits: 1500,
    features: [
      { name: 'Passes AI detectors' },
      { name: 'High quality, legible content' },
      { name: 'Watermark and future proof' },
      { name: 'Writing level matching' },
      { name: 'API compatible' },
      { name: 'Unlimited Human Auto Typer' },
      { name: 'Unlimited AI Detecting' },
    ],
    cta: 'Subscribe',
  },
  {
    name: 'Yearly',
    price: '$5.00',
    billing: 'per month',
    credits: 1500,
    features: [
      { name: 'Passes AI detectors' },
      { name: 'High quality, legible content' },
      { name: 'Watermark and future proof' },
      { name: 'Writing level matching' },
      { name: 'API compatible' },
      { name: 'Unlimited Human Auto Typer' },
      { name: 'Unlimited AI Detecting' },
    ],
    cta: 'Subscribe',
  },
];

export default function Pricing() {
  const [activePlan, setActivePlan] = useState<number>(1);

  const handleSubscribe = (plan: Plan) => {
    console.log({ plan })
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-16">Pricing Plans</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 ${activePlan === index
                    ? 'scale-105 border-2 border-blue-500'
                    : 'hover:scale-105'
                  }`}
                onClick={() => setActivePlan(index)}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">{plan.name}</h2>
                  <div className="flex items-baseline justify-center text-blue-600">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-xl text-gray-500 ml-2">/{plan.billing}</span>
                  </div>
                </div>

                <div className="mb-10">
                  <p className="text-lg font-semibold text-center mb-4">Credits per month:</p>
                  <p className="text-4xl font-bold text-blue-600 text-center">{plan.credits}</p>
                </div>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <span className={`mr-3 ${feature.free || feature.monthly || feature.yearly
                          ? 'text-green-500'
                          : 'text-gray-400'
                        }`}>
                        {feature.free || feature.monthly || feature.yearly ? '✓' : '✗'}
                      </span>
                      <span className="text-lg text-gray-700">
                        {feature.name}
                        {feature.description && (
                          <span className="ml-2 text-gray-500">({feature.description})</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full ${plan.name === 'Free' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  <span className="text-lg font-semibold">{plan.cta}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}