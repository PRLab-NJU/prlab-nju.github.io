<script setup>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import ScrollDownArrow from './components/ScrollDownArrow.vue'
</script>

<template>
    <header class="relative h-[100vh]"> 
        <div class="bg-container absolute inset-0">
            <div class="content-wrapper">
                <div class="text-content">
                    <h1 class="main-title">
                        <span class="title-text">PRLab</span>
                        <span class="title-at">@</span>
                        <span class="title-text">NJU</span>
                    </h1>
                    <h2 class="subtitle">Pattern Recognition Laboratory @</h2>
                    <h2 class="subtitle">Nanjing University</h2>
                </div>
                <ScrollDownArrow target-selector=".main-section" />
            </div>
        </div> 
        <Nav class="relative z-10"></Nav>
    </header>
    <main class="main-section">
        <div class="main-container">
            <div class="text-section">
                <div class="text-content-main">
                    <h3 class="section-title">ABOUT</h3>
                    <h1 class="lab-title">PRLab@NJU</h1>
                    <p class="description">
                        The Pattern Recognition Laboratory (PRLab@NJU) was established in 2023, originating from the research team led by <a href="https://www.nju.edu.cn/en/info/2292/4261.htm" target="_blank" class="highlight-link">Prof. Tieniu Tan</a> at Nanjing University. The laboratory focuses on advancing the fundamental research of artificial intelligence, with pattern recognition—the core of both human and machine intelligence—as its primary research area. Adhering to the development goal of being world-class, it is striving to build a nationally strategic scientific and technological force with global influence in the fields of pattern recognition and artificial intelligence. Its sister lab is <a href="http://www.cripac.ia.ac.cn/CN/model/index.htm" target="_blank" class="highlight-link">PRLab@CASIA (NLPR)</a> at the Institute of Automation, Chinese Academy of Sciences.
                    </p>
                </div>
            </div>
            <div class="image-section">
                <div class="image-container">
                    <img src="/images/njusz.jpg" alt="南京大学" class="university-image">
                </div>
            </div>
        </div>
        <div class="cards-section">
            <div class="explore-header">
                <h2 class="section-title">EXPLORE</h2>
                <h1 class="lab-title">PRLab@NJU</h1>
            </div>
            <div class="cards-container">
                <div class="card research-card">
                    <a href="/nju/research/" class="card-link">
                        <div class="card-content">
                            <h3 class="card-title">Our Research</h3>
                        </div>
                    </a>
                </div>
                <div class="card team-card">
                    <a href="/nju/people/" class="card-link">
                        <div class="card-content">
                            <h3 class="card-title">Team</h3>
                        </div>
                    </a>
                </div>
                <div class="card publications-card">
                    <a href="/nju/papers/" class="card-link">
                        <div class="card-content">
                            <h3 class="card-title">Publications</h3>
                        </div>
                    </a>
                </div>
                <div class="card contact-card">
                    <a href="/nju/contact/" class="card-link">
                        <div class="card-content">
                            <h3 class="card-title">Contact</h3>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>

<style scoped>
.bg-container {
    background-image: url('/images/bg10.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow-y: auto;
}

.bg-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/images/bg10.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* filter:  brightness(0.7); */
  z-index: 1;
}


.bg-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(52, 58, 64, 0.6), rgba(52, 58, 64, 0.6)),
    url('https://www.transparenttextures.com/patterns/concrete-wall.png');
  background-blend-mode: multiply;
  opacity: 0.4;
  z-index: 2;
}

.content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 2rem;
    position: relative;
    z-index: 3;
}

.text-content {
    text-align: center;
    color: white;
}

.main-title {
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    font-weight: 500;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
}

@media (min-width: 640px) {
    .main-title {
        font-size: 4rem;
    }
}

@media (min-width: 768px) {
    .main-title {
        font-size: 5rem;
    }
}

@media (min-width: 1024px) {
    .main-title {
        font-size: 6rem;
    }
}

.title-text {
    font-family: 'Poppins', sans-serif;
}

.title-at {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    /* opacity: 0.8; */
    margin: 0 0.1em;
}

.subtitle {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1.2;
    margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
    .subtitle {
        font-size: 1.5rem;
    }
}

@media (min-width: 768px) {
    .subtitle {
        font-size: 1.8rem;
    }
}

@media (min-width: 1024px) {
    .subtitle {
        font-size: 2rem;
    }
}

.content-container {
    position: absolute;
    top: 100vh;
    left: 0;
    width: 100vw;
    height: 100vh;
}

/* Main section styles */
.main-section {
    width: 100%;
    min-height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.main-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    gap: 0;
    align-items: stretch;
}

.text-section {
    flex: 0.8;
    padding: 4rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-content-main {
    color: black;
    max-width: none;
}

.section-title {
    font-size: 3rem;
    font-weight: 600;
    color: rgb(106, 0, 95);
    text-transform: uppercase;
}

.lab-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 2rem 0;
    color: black;
    line-height: 1.1;
}

.lab-title .title-text {
    font-family: 'Poppins', sans-serif;
}

.lab-title .title-at {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    opacity: 0.6;
    margin: 0 0.1em;
}

.description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    color: black;
}

.highlight-link {
    color: rgb(106, 0, 95);
    font-weight: 700;
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease;
}

.highlight-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: rgb(106, 0, 95);
    transition: width 0.3s ease;
}

.highlight-link:hover::after {
    width: 100%;
}

.image-section {
    flex: 1.2;
    display: flex;
    align-items: stretch;
}

.image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.university-image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

/* Cards section styles */
.cards-section {
    background-color: #f8f9fa;
    padding: 4rem 2rem;
    min-height: 50vh;
}

.explore-header {
    text-align: left;
    margin-bottom: 3rem;
    padding-left: 2rem;
}

.explore-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #6a005f;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.explore-title {
    font-size: 4rem;
    font-weight: 700;
    color: black;
    margin: 0;
    line-height: 1;
    letter-spacing: -0.01em;
}

/* Cards container styles */
.cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    max-width: 100%;
}

.card {
    width: 300px;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
}

.research-card {
    background-image: url('/images/bg16.jpg');
}

.team-card {
    background-image: url('/images/bg14.jpg');
}

.publications-card {
    background-image: url('/images/bg11.jpg');
}

.contact-card {
    background-image: url('/images/bg13.jpg');
}

.card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
    z-index: 1;
}


.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
}

.card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    position: relative;
    z-index: 2;
}

.card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    margin: 0;
    letter-spacing: 0.05em;
}

/* Responsive design */
@media (max-width: 768px) {
    .main-container {
        flex-direction: column;
        height: auto;
        gap: 2rem;
        padding: 2rem;
    }
    
    .text-section {
        padding: 3rem 2rem;
        width: 100%;
        flex: none;
    }
    
    .image-section {
        width: 100%;
        height: 50vh;
        order: -1;
        flex: none;
    }
    
    .lab-title {
        font-size: 2.5rem;
    }
    
    .description {
        font-size: 1rem;
    }
    
    .cards-container {
        gap: 1.5rem;
        justify-content: center;
    }
    
    .card {
        width: 300px;
        height: 200px;
    }
    
    .card-title {
        font-size: 1.5rem;
    }
    
    .explore-title {
        font-size: 3rem;
    }
}

@media (max-width: 480px) {
    .main-container {
        gap: 1.5rem;
        padding: 1rem;
    }
    
    .text-section {
        padding: 2rem 1.5rem;
        width: 100%;
        flex: none;
    }
    
    .image-section {
        display: none;
    }
    
    .lab-title {
        font-size: 2rem;
    }
    
    .description {
        font-size: 0.9rem;
    }
    
    .cards-container {
        gap: 1rem;
        justify-content: center;
    }
    
    .card {
        width: 300px;
        height: 200px;
    }
    
    .card-title {
        font-size: 1.5rem;
    }
    
    .explore-title {
        font-size: 2.5rem;
    }
    
    .explore-text {
        font-size: 1.25rem;
    }
}
</style>