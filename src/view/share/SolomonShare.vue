<template>

  <header class="solomon-share">
    <div class="header-limiter">
      <h1><a href="https://steamcommunity.com/groups/teamhellion/">DJ PAWZ</a></h1>
    </div>
  </header>

</template>

<script>
  export default ({
  });

</script>

<style scoped lang="less">

  .solomon-share {
    a{
      text-decoration: none;
    }

    a:hover{
      text-decoration: underline;
    }

    header {
      background-color: #000000;
      box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.15);
      /*padding: 20px 30px;*/
      box-sizing: border-box;
    }

    header .header-limiter {
      max-width: 1000px;
      margin: auto;
      display: flex;
      justify-content: space-between;
    }

    header .header-limiter h1 {
      line-height: 200px;
      font-size: 150px;
      font-weight: normal;
      color: #FF2D00;
    }
  }
  

</style>
