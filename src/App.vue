<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "milligram/dist/milligram.min.css";
</script>

<style>
html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

body {
  background: #f6f6f6;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

#app {
  display: flex;
  height: 100vh;
  border: 3px;
  flex-direction: column;
}
</style>
