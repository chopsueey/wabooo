export default function Footer() {
  return (
    <footer className=" blubb1 shadow-up flex items-center justify-center mb-4 sm:mb-0 ">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-3">
          <div>
            <h2 className="textc text-lg font-semibold mb-4">About</h2>
            <ul>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                The Team
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                How to
              </li>
            </ul>
          </div>
          <div>
            <h2 className="textc text-lg font-semibold mb-4">Community</h2>
            <ul>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                Facebook
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                Twitter
              </li>
            </ul>
          </div>
          <div>
            <h2 className="textc text-lg font-semibold mb-4">More</h2>
            <ul>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
