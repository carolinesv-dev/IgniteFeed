import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR, // formatando data e idioma
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR, // quantidade de  dias
    addSuffix: true // há
  })

  function handleCreateNewComment(event: FormEvent) { //evento do onSubmit (form do textarea)
    event.preventDefault()
    setComments([...comments, newCommentText]) // imutabilidade, passa o novo valor
    setNewCommentText('') // depois q criar, limpa a textarea
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) { //onChange (mas precisa especificar onde: textArea)
    event.target.setCustomValidity('') // após a msg 'campo obrigatório', set um valor vazio nessa msg
    setNewCommentText(event.target.value) // pega o valor do text area
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) { //onInvalid (especificar)
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setComments(commentsWithoutDeletedOne); 
    // fica na lista somente os comentários diferentes do 'comentário à deletar'
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required //true
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
          <Comment 
            key={comment} 
            content={comment}
            onDeleteComment={deleteComment}
          />
        )
        })}
      </div>
    </article>
  )
}