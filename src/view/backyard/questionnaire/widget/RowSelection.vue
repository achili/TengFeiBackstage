<template>
	<span>
		<label>
			行数:
		</label>
		<label>
			<select class="form-control" v-model="val">
				<option v-for="(n,index) in 6" :value="n" :key="index">{{n}}</option>
			</select>
		</label>
	</span>
</template>

<script>
  export default {
    data(){
      return {
        val: 1
      }
    },
    props: {
      value: {
        type: Number,
        required: false,
        "default": 1
      }
    },
    computed: {},
    watch: {
      "val"(){
        this.$emit('input', this.val);
      }
    },
    methods: {},
    mounted(){
      this.val = this.value;
    }
  }
</script>
