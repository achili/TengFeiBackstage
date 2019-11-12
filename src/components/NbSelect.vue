<template>
  <div class="option-item">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in items"
        :key="item.val"
        :label="item.name"
        :value="item.val">
      </el-option>
    </el-select>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            value:""
          }
        },
      props:{
        items: {

        }
      }
    }
</script>

<style scoped>

</style>
