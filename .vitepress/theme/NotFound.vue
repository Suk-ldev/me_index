<script setup>
import { useData } from 'vitepress';
const { theme } = useData();
import { data as iro } from './iro.data';

// 自动返回功能
function setupAutoRedirect() {
  const spElement = document.getElementById('sp');
  if (!spElement) return;
  
  let x = 10;
  const go = () => {
    x--;
    if (x > 0) {
      spElement.innerHTML = x;
    } else {
      goBack();
    }
  };
  
  setInterval(go, 1000);
}

// 立即返回功能
function goBack() {
  window.history.go(-1);
}

// 组件挂载时执行自动返回功能
import { onMounted } from 'vue';
onMounted(() => {
  setupAutoRedirect();
});
</script>

<template>
  <div class="error-page">
    <div class="container w-xxl w-auto-xs">
      <div class="text-center m-b-lg">
        <h1>404 Error Page</h1>
        <p class="zoom-area">The page you visited does not exist.</p>
        <section class="error-container">
          <span class="four"><span class="screen-reader-text">4</span></span>
          <span class="zero"><span class="screen-reader-text">0</span></span>
          <span class="four"><span class="screen-reader-text">4</span></span>
        </section>
        <small class="text-muted letterspacing">
          <b id="sp">10</b>秒后自动返回···<br>
          <a class="text-muted letterspacing" href="#" @click.prevent="goBack">立刻返回</a>
        </small>
      </div>
      <div class="list-group bg-info auto m-b-sm m-b-lg">
        <a href="/" class="list-group-item">
          <i class="fontello fontello-chevron-right text-muted"></i>
          <i class="fontello fontello-fw fontello-home m-r-xs"></i>&nbsp;首页
        </a>
      </div>
      <div class="text-center">
        <p>
          <small class="text-muted letterspacing">Suk &copy; {{ new Date().getFullYear() }}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css?family=Catamaran&subset=latin,latin-ext');

.error-page {
  background-color: #fdfaf5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', Helvetica, sans-serif;
  color: #bbb;
}

.error-container {
  text-align: center;
  font-size: 106px;
  font-family: 'Catamaran', sans-serif;
  font-weight: 800;
  margin: 70px 15px;
}

.error-container > span {
  display: inline-block;
  position: relative;
}

.error-container > span.four {
  width: 136px;
  height: 43px;
  border-radius: 999px;
  background: linear-gradient(
      140deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.07) 43%,
      transparent 44%,
      transparent 100%
    ),
    linear-gradient(
      105deg,
      transparent 0%,
      transparent 40%,
      rgba(0, 0, 0, 0.06) 41%,
      rgba(0, 0, 0, 0.07) 76%,
      transparent 77%,
      transparent 100%
    ),
    linear-gradient(to right, #d89ca4, #e27b7e);
}

.error-container > span.four:before,
.error-container > span.four:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 999px;
}

.error-container > span.four:before {
  width: 43px;
  height: 140px;
  left: 60px;
  bottom: -37px;
  background: linear-gradient(
      128deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.07) 40%,
      transparent 41%,
      transparent 100%
    ),
    linear-gradient(
      116deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.07) 50%,
      transparent 51%,
      transparent 100%
    ),
    linear-gradient(to top, #99749d, #b895ab, #cc9aa6, #d7969e, #e0787f);
}

.error-container > span.four:after {
  width: 137px;
  height: 43px;
  transform: rotate(-49.5deg);
  left: -18px;
  bottom: 36px;
  background: linear-gradient(
    to right,
    #99749d,
    #b895ab,
    #cc9aa6,
    #d7969e,
    #e0787f
  );
}

.error-container > span.zero {
  vertical-align: text-top;
  width: 156px;
  height: 156px;
  border-radius: 999px;
  background: linear-gradient(
      -45deg,
      transparent 0%,
      rgba(0, 0, 0, 0.06) 50%,
      transparent 51%,
      transparent 100%
    ),
    linear-gradient(
      to top right,
      #99749d,
      #99749d,
      #b895ab,
      #cc9aa6,
      #d7969e,
      #ed8687,
      #ed8687
    );
  overflow: hidden;
  animation: bgshadow 5s infinite;
}

.error-container > span.zero:before {
  content: "";
  display: block;
  position: absolute;
  transform: rotate(45deg);
  width: 90px;
  height: 90px;
  background-color: transparent;
  left: 0px;
  bottom: 0px;
  background: linear-gradient(
      95deg,
      transparent 0%,
      transparent 8%,
      rgba(0, 0, 0, 0.07) 9%,
      transparent 50%,
      transparent 100%
    ),
    linear-gradient(
      85deg,
      transparent 0%,
      transparent 19%,
      rgba(0, 0, 0, 0.05) 20%,
      rgba(0, 0, 0, 0.07) 91%,
      transparent 92%,
      transparent 100%
    );
}

.error-container > span.zero:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 999px;
  width: 70px;
  height: 70px;
  left: 43px;
  bottom: 43px;
  background: #fdfaf5;
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.screen-reader-text {
  position: absolute;
  top: -9999em;
  left: -9999em;
}

@keyframes bgshadow {
  0% {
    box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
  }
  45% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  55% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
  }
}

/* demo stuff */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.zoom-area {
  max-width: 490px;
  margin: 30px auto 30px;
  font-size: 19px;
  text-align: center;
}

.link-container {
  text-align: center;
}

.more-link {
  text-transform: uppercase;
  font-size: 13px;
  background-color: #de7e85;
  padding: 10px 15px;
  border-radius: 0;
  color: #fff;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  line-height: 1.5;
  text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}

.container {
  margin: 0 auto;
  padding: 0 15px;
}

.w-xxl {
  max-width: 1200px;
}

.w-auto-xs {
  width: auto;
}

.text-center {
  text-align: center;
}

.m-b-lg {
  margin-bottom: 30px;
}

.m-b-sm {
  margin-bottom: 10px;
}

.list-group {
  padding-left: 0;
  margin-bottom: 20px;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
  text-decoration: none;
  color: #333;
}

.bg-info {
  background-color: #d9edf7;
}

.auto {
  margin-left: auto;
  margin-right: auto;
}

.text-muted {
  color: #777;
}

.letterspacing {
  letter-spacing: 1px;
}

.m-r-xs {
  margin-right: 5px;
}
</style>
