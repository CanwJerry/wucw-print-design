<template>
	<w-background>
		<div class="user-signup">
			<div class="user-signup-form">
				<p class="title">
					<el-icon @click="handleBack"><Back /></el-icon>
					注册
				</p>
				<el-form ref="formRefs" :rules="rules" :model="form" >
					<el-form-item prop="username">
						<el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="form.password" type="password" show-password placeholder="请输入密码" clearable></el-input>
					</el-form-item>
					<el-form-item prop="phone">
						<el-input v-model="form.phone" type="phone" placeholder="请输入电话号码" clearable></el-input>
					</el-form-item>
				</el-form>
				<div class="btn">
					<w-button @click="handleSignup">注册</w-button>
				</div>
			</div>
		</div>
	</w-background>
</template>

<script>
	export default {
		name: 'Signup'
	}
</script>

<script setup>
	import { ref, reactive } from 'vue';
	import { useRouter } from 'vue-router';
	import { Back } from '@element-plus/icons-vue'

	const router = useRouter();

	const formRefs = ref(null);

	const form = reactive({
		username: '',
		password: '',
		phone: ''
	});

	const rules = ref({
		username: [
			{ required: true, message: '用户名称不能为空', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '密码不能为空', trigger: 'blur' },
		],
		phone: [
			{ required: true, message: '电话号码不能为空', trigger: 'blur' },
		],
	})

	const handleSignup = () => {
		formRefs.value.validate(vaild => {
			if(!vaild) return;
			console.log('注册')
		})
	}

	const handleBack = () => {
		formRefs.value.clearValidate();
		router.push('/login');
	}
</script>

<style lang="scss" scoped>
	@import '../forget/index.scss';
</style>