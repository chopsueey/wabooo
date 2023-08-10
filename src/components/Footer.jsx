export default function Footer() {
  return (
    <footer className="mb-[40px] blubb1 shadow-up flex items-center justify-center sm:mb-0 mt-10">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-around text-center">
          <div className="m-3">
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
          <div className="m-3">
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
          <div className="m-3">
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
