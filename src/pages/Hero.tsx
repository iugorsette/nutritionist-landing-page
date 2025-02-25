import bgHome from '../assets/bg_home.png';

export const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block font-script text-primary  dark:text-primary-alert xl:inline">Sua Jornada para</span>{' '}
                <span className="block text-secondary xl:inline">uma saúde melhor</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                 Transformando vidas através de orientação nutricional personalizada e hábitos saudáveis sustentáveis.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-full shadow">
                  <a
                    href="https://wa.me/5531971630379?text=Olá%0AQuero%20iniciar%20minha%20jornada%20para%20uma%20vida%20mais%20saudável!" target="_blank"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary dark:bg-primary-alert hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                  >
                    Comece sua jornada
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          // src="https://images.unsplash.com/photo-1490818387583-1baba5e638af"
          src={bgHome}
          alt="Fresh healthy food"
        />
      </div>
    </div>
  );
};