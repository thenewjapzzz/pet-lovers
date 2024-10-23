import React from "react";
import Menu from "../../components/Menu/Menu";
import "./Home.css";

function Home() {
  const testimonials = [
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
  ];
  return (
    <>
      <Menu />
      <div>
        <header className="hero-section">
          <div className="hero-content">
            <h1>Bem-vindo ao PetLovers</h1>
            <p>
              Aqui, os seus pets são tratados com um carinho especial e amor
              incondicional, pois sabemos o quanto eles significam para você e
              queremos que se sintam em casa!
            </p>
            <button className="cta-button">
              Conheça mais sobre nossos serviços!
            </button>
          </div>
        </header>

        <section className="services-section">
          <h2>Nossos Serviços</h2>
          <div className="services-container">
            <div className="service-card">
              <img
                src="/banho-tosa.jpg"
                alt="Banho e Tosa"
                className="service-image"
              />
              <h3>Banho & Tosa</h3>
              <p>
                O banho e tosa é um dos serviços mais importantes para manter a
                saúde e a higiene dos animais de estimação. É por isso que, em
                nosso petshop, oferecemos um serviço de banho e tosa completo e
                personalizado, que atende às necessidades de cada animal.
              </p>
              <button className="button-service-section">
                Clique aqui e agende o banho e tosa do seu pet!
              </button>
            </div>
            <div className="service-card">
              <img
                src="/veterinario-pets.jpg"
                alt="Veterinários pets"
                className="service-image"
              />
              <h3>Veterinário</h3>
              <p>
                Nossos veterinários estão sempre prontos para oferecer o melhor
                atendimento e cuidado para o seu pet. Com anos de experiência e
                dedicação, nossa equipe de profissionais capacitados se preocupa
                com a saúde e bem-estar do seu animal.
              </p>
              <button className="button-service-section">
                Agende já uma consulta e conheça nosos serviço
              </button>
            </div>
            <div className="service-card">
              <img
                src="/produtos-pets.jpg"
                alt="Produtos Pets"
                className="service-image"
              />
              <h3>Produtos para Pet</h3>
              <p>
                Aqui você encontra tudo o que precisa para cuidar do seu animal
                de estimação com muito amor e carinho. No nosso petshop,
                trabalhamos apenas com as melhores marcas do mercado, garantindo
                a qualidade e a segurança dos produtos oferecidos.
              </p>
              <button className="button-service-section">
                Clique aqui e conheça nossos produtos disponíveis.
              </button>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Sobre Nós</h2>
          <div className="about-content">
            <p>
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

        <section className="testimonials-section">
          <h2>Depoimentos</h2>
          <div className="testimonials-container">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <img
                  src={testimonial.profileImage}
                  alt=""
                  className="testimonial-profile-image"
                />
                <blockquote className="testimonial-text">
                  {testimonial.text}
                </blockquote>
                <p className="testimonial-name">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2024 PetLovers. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}

export default Home;
