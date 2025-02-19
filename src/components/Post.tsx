import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import ReactMarkdown from 'react-markdown'

interface PostData {
  imageUrl: string
  title: string
  content: string
}

// const markdown = `🍽️ **Como Montar um Prato Saudável?** Montar um prato saudável é mais fácil do que parece! O segredo está no equilíbrio entre macronutrientes (proteínas, carboidratos e gorduras saudáveis) e micronutrientes (vitaminas e minerais). \n\n Aqui está um guia prático para garantir uma alimentação nutritiva e saborosa! \n\n 🥦 1. Metade do prato deve ser de vegetais Opte por legumes e verduras coloridos, como brócolis, cenoura, espinafre e tomate. Eles são ricos em fibras, vitaminas e antioxidantes, essenciais para a saúde. \n\n 🍚 2. ¼ do prato deve ser carboidrato saudável Prefira carboidratos complexos como arroz integral, batata-doce, quinoa ou feijão. Eles fornecem energia de forma equilibrada e evitam picos de glicose no sangue. \n\n🍗 3. ¼ do prato deve ser proteína Inclua proteínas magras como frango, peixe, ovos ou proteínas vegetais (grão-de-bico, lentilha, tofu). As proteínas são essenciais para a manutenção dos músculos e saciedade. \n\n🥑 4. Adicione gorduras boas Utilize azeite de oliva, abacate, castanhas ou sementes (chia, linhaça). As gorduras saudáveis ajudam na absorção de vitaminas e na saúde do coração. \n\n💧 Bônus: Não se esqueça da hidratação! Acompanhe seu prato com bastante água ao longo do dia! Seguindo esse modelo, você garante uma alimentação equilibrada, rica em nutrientes e perfeita para manter a saúde em dia! 🥗💪"`
export const Post = () => {
  const { slug } = useParams()
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const q = query(collection(db, 'posts'), where('slug', '==', slug))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const postData = querySnapshot.docs[0].data() as PostData
          setPost(postData)
        } else {
          setError('Post não encontrado.')
        }
      } catch (err) {
        console.error('Erro ao buscar post:', err)
        setError('Erro ao carregar o post.')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return <p className="text-center py-16">Carregando...</p>
  }

  if (error) {
    return <p className="text-center py-16 text-red-500">{error}</p>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {post && (
        <>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <div className="prose prose-lg mt-4 text-gray-600">
            <ReactMarkdown>{post.content.replace(/\\n/g, '\n')}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  )
}
