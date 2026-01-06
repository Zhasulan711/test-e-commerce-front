export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto 2xl:max-w-325 xl:max-w-300 lg:max-w-220 md:max-w-172 sm:max-w-100 max-w-80 py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            <p>&copy; {currentYear} E-Commerce. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a
              href="#"
              className="hover:text-gray-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gray-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-gray-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


