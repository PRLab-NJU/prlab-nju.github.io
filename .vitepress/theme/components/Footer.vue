<script setup>
import { useI18n } from '../i18n/index.js'

const t = useI18n('Footer')
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-left">
                <div class="lab-info">
                    <div class="lab-name">
                        <h2 class="lab-title">PRLab</h2>
                        <h3 class="lab-subtitle">@NJU</h3>
                    </div>
                    <div class="address">
                        <p>{{ t.addressLine1 }}</p>
                        <p>{{ t.addressLine2 }}</p>
                        <p>{{ t.addressLine3 }}</p>
                    </div>
                </div>
            </div>
            
            <div class="footer-right">
                <div class="nav-links">
                    <a href="/nju/research/" class="nav-link">{{ t.navResearch }}</a>
                    <a href="/nju/people/" class="nav-link">{{ t.navTeam }}</a>
                    <a href="/nju/papers/" class="nav-link">{{ t.navPublications }}</a>
                    <a href="/nju/contact/" class="nav-link">{{ t.navContact }}</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #2c2c2c;
    color: white;
    padding: 1.5rem 2rem;
    width: 100%;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
}

.footer-left {
    flex: 1;
}

.lab-info {
    display: flex;
    align-items: center;
    gap: 3rem;
}

.lab-name {
    margin-bottom: 0;
}

.lab-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin: 0;
    line-height: 1;
}

.lab-subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    color: white;
    margin: 0;
    line-height: 1;
}

.address {
    color: #cccccc;
    font-size: 0.9rem;
    line-height: 1.4;
}

.address p {
    margin: 0.2rem 0;
}

.footer-right {
    flex: 2;
    display: flex;
    justify-content: flex-end;
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #6a005f;
}

/* Responsive Design */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
    }
    
    .footer-right {
        justify-content: center;
    }
    
    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
    }
    
    .lab-title {
        font-size: 2rem;
    }
    
    .lab-subtitle {
        font-size: 1.25rem;
    }
}

@media (max-width: 480px) {
    .footer {
        padding: 2rem 1rem;
    }
    
    .nav-links {
        flex-direction: column;
        gap: 1rem;
    }
    
    .lab-title {
        font-size: 1.75rem;
    }
    
    .lab-subtitle {
        font-size: 1rem;
    }
}
</style>