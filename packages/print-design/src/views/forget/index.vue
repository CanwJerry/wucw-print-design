<template>
	<w-background>
		<div class="forget-password">
			<div class="forget-form">
				<p class="title">
					<el-icon @click="handleBack"><Back /></el-icon>
					忘记密码
				</p>
				<el-form ref="formRefs" :rules="rules" :model="form" >
					<el-form-item prop="username">
						<el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="form.password" type="password" show-password placeholder="请输入密码" clearable></el-input>
					</el-form-item>
					<el-form-item prop="phone">
						<el-input v-model="form.phone" placeholder="请输入电话号码" clearable></el-input>
					</el-form-item>
					<el-form-item prop="verifyCode">
						<el-input v-model="form.verifyCode" placeholder="请输入验证码" clearable></el-input>
					</el-form-item>
				</el-form>
				<div class="btn">
					<w-button @click="handleChangePassword">修改密码</w-button>
				</div>
			</div>
		</div>
	</w-background>
</template>

<script>
	export default {
		name: 'Forget'
	}
</script>

<script setup>
	import { ref, reactive } from 'vue';
	import { useRouter } from 'vue-router';
	import { Back } from '@element-plus/icons-vue';
	import { updateUserPassword } from '@/api/api';

	const router = useRouter();

	const formRefs = ref(null);

	const form = reactive({
		username: '',
		phone: '',
		password: '',
		verifyCode: ''
	});

	const rules = ref({
		username: [
			{ required: true, message: '用户名称不能为空', trigger: 'blur' },
		],
		phone: [
			{ required: true, message: '电话号码不能为空', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '密码不能为空', trigger: 'blur' },
		],
	})

	const handleChangePassword = () => {
		formRefs.value.validate(vaild => {
			if(!vaild) return;
			updateUserPassword(form).then(res => {
				if(res.status === 200) {
					router.push('/index');
				}
			})
		})
	}

	const handleBack = () => {
		formRefs.value.clearValidate();
		router.push('/login');
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>