import Button from '@/components/common/Button';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CTASection = ({
  title,
  description,
  buttonText,
  onButtonClick
}: CTASectionProps) => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-blue-100 text-lg mb-8">
            {description}
          </p>
        )}
        <Button
          onClick={onButtonClick}
          className="bg-indigo-800 text-white hover:bg-indigo-700 px-8 py-3 rounded-md font-medium inline-block"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
