export default function Footer() {
  return (
    <footer className="blubb1 shadow-up flex items-center justify-center sm:mb-0 mt-10 mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8 rounded-xl">
      <div className="max-w-7xl mx-auto pt-6 pb-2 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-around text-center">
          <div className="m-3">
            <h2 className="textc text-lg font-semibold mb-4">About</h2>
            <ul>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                <a href="">The Team</a>
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                <a href="">Connect</a>
              </li>
            </ul>
          </div>
          <div className="m-3">
            <h2 className="textc text-lg font-semibold mb-4">Community</h2>
            <ul>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                <a href="">Facebook</a>
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                <a href="">Twitter</a>
              </li>
            </ul>
          </div>
          <div className="m-3">
            <h2 className="textc text-lg font-semibold mb-4">More</h2>
            <ul>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                <a href="">Terms</a>
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">
                <a href="">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center font-extralight text-white mt-4">
          Made with ❤️ by:&nbsp;
          <br className="sm:hidden" />
          Alex - Basti - Nargiza - Marius
        </div>
      </div>
    </footer>
  );
}
