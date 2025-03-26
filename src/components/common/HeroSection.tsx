import Button from '@/components/common/Button';

interface HeroSectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

const HeroSection = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick
}: HeroSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={onPrimaryButtonClick}
            className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-md font-medium"
          >
            {primaryButtonText}
          </Button>
          <Button
            onClick={onSecondaryButtonClick}
            className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-md font-medium"
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
