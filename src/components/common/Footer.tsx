interface FooterProps {
  siteTitle: string;
  footerLinks: { title: string; links: { name: string; url: string }[] }[];
  copyright: string;
}

const Footer = ({ siteTitle, footerLinks, copyright }: FooterProps) => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{siteTitle}</h3>
            <p className="text-blue-100">Supercharge your writing with AI</p>
          </div>
          
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-500">
          <p className="text-blue-100">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
