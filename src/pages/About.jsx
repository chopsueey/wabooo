export default function About() {
  return (
    <div className="mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <section className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col h-screen justify-center lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
        <section className="flex flex-col justify-center items-center p-2 mt-16">
          <h2 className="text-white  text-center text-5xl lg:text-7xl mb-10 font-bold ">
            Hey 👋, nice to see you here!
          </h2>
          <h2 className="blubb rounded-xl shadow-lg shadow-black text-white text-xl mb-10 font-light py-10 mt-20 px-10 sm:px-20 w-fit mx-2 sm:mx-10 max-w-[800px]">
            <span className="text-cyan-400">Wabooo</span> is a webdevelopment project made by four students from
            Germany. This project was meant as a final project at the DCI
            (Digital Career Institute). We used React, Node.js, MongoDB and
            Express.js (and Vite as bundler and dev-environment), to build a
            social-media-like webapp.
            <br />
            <br />
            If you signup (just click on Test account), you will see several
            questions on your screen. The central idea is that you can post a
            question to other users that can only answer this question with
            'yes' or 'no'. When you answer, you will see the percentage of how
            many other users answered with either 'yes' or 'no'.
            <br />
            <br />
            The app features a follower system, likes, comments, topic search and stats about
            the average age of who answered your question and where they are
            coming from (supposed their profil is legit).
            <br/>
            <br/>
            <a className="text-cyan-400 hover:underline" href="/contact">Connect with us!</a> 
          </h2>
        </section>
      </section>
    </div>
  );
}
