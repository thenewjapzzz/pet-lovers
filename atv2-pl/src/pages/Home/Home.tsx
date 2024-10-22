import React from 'react';
import Menu from "../../components/Menu/Menu";
import './Home.css';

function Home() {
  return (
    <>
    <Menu />
    <div>
      <header className="hero-section">
        <div className="hero-content">
          <h1>Bem-vindo ao PetLovers</h1>
          <p>Aqui, os seus pets são tratados com um carinho especial e amor incondicional, pois sabemos o quanto eles significam para você e queremos que se sintam em casa!</p>
          <button className="cta-button">Conheça nossos serviços</button>
        </div>
      </header>

    <section className="products-section">
        <h2>Nossos Produtos</h2>
        <div className="products-container">
            <div className="product-card">
            <img src="URL_DA_IMAGEM_1" alt="Ração Premium" className="product-image" />
            <h3>Ração Premium</h3>
            <p>Ração de alta qualidade para garantir a saúde e o bem-estar do seu pet.</p>
            </div>
            <div className="product-card">
            <img src="URL_DA_IMAGEM_2" alt="Brinquedos Interativos" className="product-image" />
            <h3>Brinquedos Interativos</h3>
            <p>Brinquedos que estimulam a mente e entretêm seu pet por horas.</p>
            </div>
            <div className="product-card">
            <img src="URL_DA_IMAGEM_3" alt="Camas Confortáveis" className="product-image" />
            <h3>Camas Confortáveis</h3>
            <p>Camas macias e aconchegantes para o descanso perfeito do seu pet.</p>
            </div>
        </div>
    </section>
 
      <section className="services-section">
        <h2>Nossos Serviços</h2>
        <div className="services-container">
          <div className="service-card">
            <h3>Banho & Tosa</h3>
            <p>Deixe seu pet mais bonito e perfumado com nossos cuidados profissionais.</p>
          </div>
          <div className="service-card">
            <h3>Veterinário</h3>
            <p>Atendimento especializado para garantir a saúde e bem-estar dos seus pets.</p>
          </div>
          <div className="service-card">
            <h3>PetShop</h3>
            <p>Uma ampla variedade de produtos para cuidar e mimar seus pets.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Sobre Nós</h2>
        <p>No PetLovers, nossa missão é oferecer o melhor cuidado possível para seus animais de estimação. Com uma equipe de profissionais dedicados, garantimos que seu pet receba o carinho e atenção que merece.</p>
      </section>
      
      <section className="testimonials-section">
        <h2>Depoimentos</h2>
        <div className="testimonials-container">
          <blockquote>"Ótimo serviço! Meu cachorro ficou lindo e muito bem cuidado." - Maria S.</blockquote>
          <blockquote>"Equipe excelente, sempre atenciosos e carinhosos com meus gatos." - João P.</blockquote>
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
