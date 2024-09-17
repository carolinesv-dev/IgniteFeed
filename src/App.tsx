// JSX = Javascript + XML (sintaxe semelhante a do HTML)
import { Header } from "./components/Header";
import { Post, PostType } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import styles from './App.module.css';
import './global.css';

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/carolinesv-dev.png',
      name: 'Carol Silveira',
      role: 'Web Developer'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: '👉 jane.design/doctorcare'},
      {type: 'link', content: '#novoprojeto'},  
      {type: 'link', content: '#javascript'},  
      {type: 'link', content: '#react'},  
    ],
    publishedAt: new Date('2024-09-01 13:20:38'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/mariaazimi.png',
      name: 'Maria Silva',
      role: 'UX/UI Design'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: '👉 jane.design/doctorcare'},
      {type: 'link', content: '#novoprojeto'},  
      {type: 'link', content: '#javascript'},  
      {type: 'link', content: '#react'},  
    ],
    publishedAt: new Date('2024-09-15 13:20:38'),
  },
];

export default function App() {
  return (
    <div>
      <Header />

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Sidebar />
          <main>
            {posts.map(post => { // iteração, repetição
              return (
              <Post 
                key={post.id}
                post={post}
              />
            )
            })}
          </main>
        </div>
      </div>

    </div>
  )
}