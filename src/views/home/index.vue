<template>
  <div class="home">
    <div class="top">
      <ul class="flsb">
        <li class="flsb">
          <div class="left">left</div>
          <div class="right">right</div>
        </li>
        <li class="yellow">1</li>
        <li class="gay">1</li>
      </ul>
    </div>
    <div>
      表格
    </div>
    机构管理首页---总览
  </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style lang="scss" scoped>
.home{
    .top{
        ul>li{
            width: 490px;
            height: 230px;
            .left{
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
                width: 20px;
                height: 100%;
                background: linear-gradient(0deg,rgba(11,186,251,1),rgba(66,133,236,1));
            }
            .right{
                width: 470px;
                height: 100%;
                background-color: #fff;
                border-bottom-right-radius: 20px;
                border-top-right-radius: 20px;
            }
        }
    }
}

</style>
