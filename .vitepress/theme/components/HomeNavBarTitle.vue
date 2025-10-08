<script>
export default {
    methods: {
        handleTitleClick() {
            this.$emit('title-clicked');
        }
    }
}
</script>

<template>
    <div class="floating-title-container">
        <a href="/" class="flex items-center no-underline title-link floating-button" @click="handleTitleClick">
            <span class="title text-xl font-bold text-white">PRLab</span>
        </a>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}

.title {
    font-family: 'Poppins', sans-serif;
}

.floating-title-container {
    position: relative;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: visible;
}

.floating-button {
    position: relative;
    background: linear-gradient(135deg, #6A005F 0%, #0D4994 100%);
    border-radius: 0;
    padding: 23px 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 
                0 4px 16px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(0px);
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.floating-button:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.45), 
                0 5px 18px rgba(0, 0, 0, 0.35),
                0 0 0 1px rgba(255, 255, 255, 0.25);
    background: linear-gradient(135deg, #7A006F 0%, #1D5994 100%);
    transition: all 0.8s ease;
}
</style>
