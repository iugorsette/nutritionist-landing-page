import { getAuth } from "firebase/auth";
import { db, storage, timestamp } from "../firebase";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Post } from "../types/Post";

const ALLOWED_EMAILS = ["iugorsette@gmail.com", "renatalazarino.nutri@gmail.com"];


const getAuthenticatedUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Usuário não autenticado!");
  if (!ALLOWED_EMAILS.includes(user.email!)) throw new Error("E-mail não permitido!");

  return user;
};

const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `blog/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const getPostById = async (postId: string) => {
  try {
    const postSnap = await getDoc(doc(db, "posts", postId));

    if (!postSnap.exists()) {
      return { success: false, error: "Post não encontrado." };
    }

    return { success: true, post: { id: postSnap.id, ...postSnap.data() } as Post };
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return { success: false, error };
  }
};

export const createPost = async (post: Omit<Post, "id" | "createdAt" | "imageUrl">, file: File) => {
  try {
    const user = getAuthenticatedUser();
    const imageUrl = await uploadImage(file);

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
  post: Partial<Omit<Post, "id" | "imageUrl" | "createdAt">>, 
  file?: File
) => {
  try {
    const user = getAuthenticatedUser();
    if (!ALLOWED_EMAILS.includes(user.email!)) {
      throw new Error("E-mail não permitido!");
    }

    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error("Post não encontrado!");
    }

    let imageUrl = postSnap.data().imageUrl;

    if (file) {
      console.log("Fazendo upload da nova imagem...");
      const storageRef = ref(storage, `blog/${file.name}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    const postData: any = { ...post, imageUrl };
    delete postData.createdAt;
    console.log("Atualizando post no Firestore...", postData);

    await updateDoc(postRef, postData);

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return { success: false, error };
  }
};


