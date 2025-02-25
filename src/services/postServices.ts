import { getAuth } from "firebase/auth";
import { db, storage, timestamp } from "../firebase";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Post } from "../types/Post";


const emailsPermitidos = [
  "iugorsette@gmail.com",
  "renatalazarino.nutri@gmail.com"
];
export const getPostById = async (postId: string) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        post: {
          id: docSnap.id,
          ...docSnap.data(),
        } as Post,
      };
    } else {
      return { success: false, error: "Post não encontrado." };
    }
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return { success: false, error };
  }  
}

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


export const updatePost = async (
  postId: string,
  post: Partial<Omit<Post, "id" | "imageUrl">>, 
  file: File | null
) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado!");
    }
    if (!emailsPermitidos.includes(user.email!)) {
      throw new Error("E-mail não permitido!");
    }

    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error("Post não encontrado!");
    }

    let imageUrl = postSnap.data().imageUrl || "";

    if (file) {
      console.log("Fazendo upload da nova imagem...");
      const storageRef = ref(storage, `blog/${file.name}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    const postData = { ...post, imageUrl };
    delete postData.createdAt; 

    console.log("Atualizando post no Firestore...");
    await updateDoc(postRef, postData);

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return { success: false, error };
  }
};
