export default function Contact() {
  return (
    <div className="mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <section className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col min-h-screen justify-center lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
        <section className="flex flex-col items-center sm:justify-center p-2">
          <h1 className="text-white  text-center text-5xl lg:text-7xl mb-10 font-bold ">
            Get in touch:
          </h1>
          <div className="blubb rounded-xl shadow-lg shadow-black text-white text-xl m-10 font-light py-10 px-10 sm:px-20 w-fit mx-2 sm:mx-10 max-w-[800px] space-y-4">
            <div>
            <h2>Github:</h2>
            <div>
            <a className="text-cyan-400 hover:underline" href="https://github.com/chopsueey/wabooo" target="blank">Repo</a>
            </div>
            </div>
              
            <div>
            <h2>Our profiles:</h2>
            <div className="space-x-4">
            <a className="text-cyan-400 hover:underline" href="https://github.com/SoraSen" target="blank">Alex</a>
            <a className="text-cyan-400 hover:underline" href="https://github.com/NargizaNar" target="blank">Nargiza</a>
            <a className="text-cyan-400 hover:underline" href="https://github.com/Basti2601" target="blank">Basti</a>
            <a className="text-cyan-400 hover:underline" href="https://github.com/chopsueey" target="blank">Marius</a>
            </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
