import { useStore } from "vuex";

export default async function mutations(mapper, value) {
  const store = useStore();

  return await store.commit(mapper, value);
}