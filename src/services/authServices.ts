import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase"; // Certifique-se de importar a inicialização do Firebase

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const emailsPermitidos = [
//   "iugorsette@gmail.com",
//   "renatalazarino.nutri@gmai.com"
// ];

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // if (!emailsPermitidos.includes(result.user.email!)) {
    //   throw new Error("E-mail não permitido!");
    // }
    console.log("Usuário logado:", result.user);    
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Erro no login:", error);
    return { success: false, error };
  }
};