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
					<el-form-item prop="oldPassword">
						<el-input v-model="form.oldPassword" type="password" show-password placeholder="请输入旧密码" clearable></el-input>
					</el-form-item>
					<el-form-item prop="newPassword">
						<el-input v-model="form.newPassword" type="password" show-password placeholder="请输入新密码" clearable></el-input>
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
	import { Back } from '@element-plus/icons-vue'

	const router = useRouter();

	const formRefs = ref(null);

	const form = reactive({
		username: '',
		oldPassword: '',
		newPassword: '',
	});

	const rules = ref({
		username: [
			{ required: true, message: '用户名称不能为空', trigger: 'blur' },
		],
		oldPassword: [
			{ required: true, message: '旧密码不能为空', trigger: 'blur' },
		],
		newPassword: [
			{ required: true, message: '新密码不能为空', trigger: 'blur' },
		],
	})

	const handleChangePassword = () => {
		formRefs.value.validate(vaild => {
			if(!vaild) return;
			console.log('修改密码')
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