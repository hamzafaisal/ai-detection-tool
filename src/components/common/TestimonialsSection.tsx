import Image from "next/image";

interface TestimonialsSectionProps {
  title: string;
  testimonials: {
    image: string;
    quote: string;
    author: string;
    role?: string;
  }[];
}

const TestimonialsSection = ({
  title,
  testimonials
}: TestimonialsSectionProps) => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center"
            >
              <Image 
                src={testimonial.image} 
                alt={testimonial.author} 
                className="w-20 h-20 object-cover rounded-full mb-4"
                width={80}
                height={80}
                layout="intrinsic"
              />
              <p className="text-gray-600 italic mb-4">{`"`+testimonial.quote+`"`}</p>
              <p className="font-semibold text-gray-800">{testimonial.author}</p>
              {testimonial.role && (
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
