import { resetRouter, router } from '@/router';

export default function() {
  sessionStorage.clear();
  resetRouter();
  router.push('/login')
}