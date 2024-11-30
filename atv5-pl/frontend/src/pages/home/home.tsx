import React, { useState } from "react";
import Menu from "../../components/menu/menu";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()

  const navigateToService = () => {
    navigate('/servicos')
  }

  const navigateBathAndGrooming = () => {
    navigate('/pedido')
  }

  const navigateToProduct = () => {
    navigate('/produtos')
  }

  const [testimonials] = useState([
    {
      id: 1,
      name: "Maria S.",
      text: "O atendimento foi impecável! Meu cachorro ficou maravilhoso depois do banho e tosa. Além disso, fiquei tranquila sabendo que ele estava em mãos tão cuidadosas. Recomendo muito o serviço!",
      profileImage: "/profile1.jpg",
    },
    {
      id: 2,
      name: "João P.",
      text: "A equipe é simplesmente fantástica! Eles sempre tratam meus gatos com tanto carinho e atenção, e isso faz toda a diferença. É ótimo saber que posso contar com um serviço de confiança para cuidar dos meus bichinhos.",
      profileImage: "/profile2.jpg",
    },
    {
      id: 3,
      name: "Guilherme S.",
      text: "Estou muito satisfeito com o serviço oferecido. Tenho dois cachorros que são bastante energéticos, e eles sempre saem de lá felizes e bem cuidados. O ambiente é limpo, acolhedor, e a equipe faz um trabalho excepcional. Recomendo de olhos fechados!",
      profileImage: "profile3.jpg",
    },
  ]);

  return (
    <>
      <Menu />
      <div>
        <header className="bg-purple-600 text-white py-16 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-left mb-8 md:mb-0 md:w-1/2 ml-5">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Bem-vindo ao PetLovers
              </h1>
              <p className="text-lg sm:text-2xl mb-8">
                Aqui, os seus pets são tratados com um carinho especial e amor
                incondicional, <br className="hidden sm:block" />pois sabemos o quanto eles significam para você e
                queremos que se sintam em casa!
              </p>
              <button className="bg-orange-500 text-black py-2 px-4 rounded-md hover:bg-orange-400 transition duration-200" onClick={navigateToService}>
                Conheça mais sobre nossos serviços!
              </button>
            </div>

            <img
              src="/pet care-rafiki.png"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              alt="Pet Care"
            />
          </div>
        </header>

        <section className="py-20 px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-10">Nossos Serviços e Produtos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="service-card bg-white p-6 rounded-lg shadow-md">
              <img
                src="/banho-tosa.jpg"
                alt="Banho e Tosa"
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">Banho & Tosa</h3>
              <p className="text-base mb-4">
                O banho e tosa é um dos serviços mais importantes para manter a
                saúde e a higiene dos animais de estimação. É por isso que, em
                nosso petshop, oferecemos um serviço de banho e tosa completo e
                personalizado, que atende às necessidades de cada animal.
              </p>
              <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 transition duration-200" onClick={navigateBathAndGrooming}>
                Clique aqui e agende o banho e tosa do seu pet!
              </button>
            </div>
            <div className="service-card bg-white p-6 rounded-lg shadow-md">
              <img
                src="/veterinario-pets.jpg"
                alt="Veterinários pets"
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">Veterinário</h3>
              <p className="text-base mb-4">
                Nossos veterinários estão sempre prontos para oferecer o melhor
                atendimento e cuidado para o seu pet. Com anos de experiência e
                dedicação, nossa equipe de profissionais capacitados se preocupa
                com a saúde e bem-estar do seu animal.
              </p>
              <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 transition duration-200" onClick={navigateToService}>
                Agende já uma consulta e conheça nossos serviços
              </button>
            </div>
            <div className="service-card bg-white p-6 rounded-lg shadow-md">
              <img
                src="/produtos-pets.jpg"
                alt="Produtos Pets"
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">Produtos para Pet</h3>
              <p className="text-base mb-4">
                Aqui você encontra tudo o que precisa para cuidar do seu animal
                de estimação com muito amor e carinho. No nosso petshop,
                trabalhamos apenas com as melhores marcas do mercado, garantindo
                a qualidade e a segurança dos produtos oferecidos.
              </p>
              <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 transition duration-200" onClick={navigateToProduct}>
                Clique aqui e conheça nossos produtos disponíveis.
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 text-center bg-gray-100">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-10">Sobre Nós</h2>
          <div className="text-lg max-w-3xl mx-auto">
            <p className="mb-4">
              No <strong>PetLovers</strong>, nossa paixão por animais nos motiva
              a oferecer o melhor cuidado e carinho para os seus pets. Com uma
              equipe dedicada de profissionais, nosso objetivo é garantir que
              seus animais recebam o tratamento de excelência que merecem.
            </p>
            <p>
              Desde os nossos primeiros passos, buscamos ser referência no
              cuidado com os pets, criando um ambiente seguro, saudável e
              acolhedor. Aqui, acreditamos que cada pet merece ser tratado com
              amor e atenção, proporcionando tranquilidade e confiança para seus
              donos.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-10">Depoimentos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-white p-6 rounded-lg shadow-md"
              >
                <img 
                  src={testimonial.profileImage}
                  alt={testimonial.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 mx-auto"
                />
                <blockquote className="text-base mb-4">
                  "{testimonial.text}"
                </blockquote>
                <p className="font-semibold text-lg">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2024 PetLovers. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
