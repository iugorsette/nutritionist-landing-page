import nutriFoto from '../assets/nutri_renata.webp';
export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="lg:text-center">
        <h2 className="text-4xl font-script text-primary mb-4">Sobre a nutri</h2>
        <img src={nutriFoto} alt="Nutricionista" className="h-96 w-full object-cover rounded-lg hidden sm:block"/>
        <p className="mt-4 max-w-2xl text-gray-500 lg:mx-auto">
          Como nutricionista dedicada, sou apaixonada por ajudar as pessoas a alcançarem seus objetivos de saúde e bem-estar.
        Se você busca uma alimentação equilibrada para emagrecer ou ganhar massa muscular, estou aqui para te ajudar.
        </p>
      </div>
      
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-4">Minha Abordagem</h3>
            <p className="text-gray-500">
              Acredito em criar planos nutricionais personalizados que se adaptem ao seu estilo de vida, preferências e objetivos. Minha abordagem combina pesquisas científicas com soluções práticas e sustentáveis.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-4">Qualificações</h3>
            <ul className="space-y-2 text-gray-500">
              <li>• ✅ Nutricionista Certificada</li>
              {/* <li>• 🏋️‍♀️ Especializada em Nutrição Esportiva</li> */}
              <li>• 📅 Mais de 3 anos de experiência</li>
              <li>• 📚 Aperfeiçoamento profissional contínuo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};