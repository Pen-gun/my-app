import '../../index.css'

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-start px-8 py-16 lg:px-24">
      <div className="lg:w-1/2 text-left lg:text-left max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 leading-snug mb-4">
          Discover <br />
          <span className="text-purple-600 text-8xl">FASHION </span>
            <p>That Defines You</p>
        </h1>
        <p className="text-gray-700 mb-6">
          Discover a world of fashion and style with our curated collection of apparel.
        </p>
        <div className="flex items-center justify-center lg:justify-start space-x-4">
          <button 
            className="bg-purple-600 text-black px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition"
            onClick={() => {
                window.scrollTo({
                  top: 550,
                  behavior: "smooth",
                })
              }}
            >
            Explore More
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection