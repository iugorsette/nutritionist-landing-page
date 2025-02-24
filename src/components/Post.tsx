import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import ReactMarkdown from 'react-markdown'

import { Helmet } from "react-helmet";
import { Post } from '../types/Post'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'


export const PostComponent = () => {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const q = query(collection(db, 'posts'), where('slug', '==', slug))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          setError('Post não encontrado.')
        } else {
          setPost(querySnapshot.docs[0].data() as Post)
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
    <>
    
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {post && (
        <>
    
          <Helmet>
            <title>{post.title} | Meu Blog</title>
            <meta name="description" content={post.excerpt || post.content.substring(0, 150) + "..."} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt || post.content.substring(0, 150) + "..."} />
            <meta property="og:image" content={post.imageUrl} />
          </Helmet>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-md mb-6"
            />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{post.title}</h1>
          <div className="prose prose-lg mt-4 text-gray-600">
            <ReactMarkdown>{post.content.replace(/\\n/g, '\n')}</ReactMarkdown>
          </div>
          <p className="text-gray-500 text-sm mt-2">Criado por {post.authorName} </p>
          <p className="text-sm text-gray-500 italic mt-2 text-right">
            Publicado em {format(new Date(post.createdAt.toDate()), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>

        </>
      )}
    </div>
      </>
  )
}
