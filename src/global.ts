// globals.ts

export let userId: number | null = null; // Puedes especificar el tipo de userId según tus necesidades

export const setUserId = (id: number) => {
    userId = id;
};
