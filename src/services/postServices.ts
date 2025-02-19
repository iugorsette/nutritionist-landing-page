import { getAuth } from "firebase/auth";
import { db, storage, timestamp } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Post } from "../types/Post";


const emailsPermitidos = [
  "iugorsette@gmail.com",
  "renatalazarino.nutri@gmai.com"
];

export const createPost = async (post: Omit<Post, "id" | "createdAt" | "imageUrl">, file: File) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado!");
    }
    if (!emailsPermitidos.includes(user.email!)) {
      throw new Error("E-mail não permitido!");
    }
    
    console.log("Fazendo upload da imagem...");
    const storageRef = ref(storage, `blog/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    console.log("Criando post no Firestore...");
    await addDoc(collection(db, "posts"), {
      ...post,
      imageUrl,
      createdAt: timestamp(),
      userId: user.uid,
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return { success: false, error };
  }
};
