import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import styled from 'styled-components'
import Navbar from '../components/Navbar'

const Wrapper = styled.div`
  background: #EEF5FF;
  min-height: 94vh;
  height: 100%;
`
const PostsWrapper = styled.div`
  display: grid;
  flex-wrap: wrap;
  gap: 30px 50px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
  width: 1110px;
`
const PostItem = styled.div`
  width: 350px;
  height: 270px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: .3s all ease;
  :hover {
    transform: scale(1.1);
  }
`
const PostImage = styled.a`
  width: 350px;
  height: 220px;
  background: url('${props => props.img}') center / cover no-repeat;
  border-radius: 20px 20px 0 0;
`
const PostFooter = styled.div`
  background: #FEFEFE;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 20px 20px;
  `
const PostTitle = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #3260A1;
`
export default function Home({posts}) {
  if (! posts) return '...loading'
  return (
    <div>
      <Head>
      </Head>
      <Navbar/>
      <Wrapper>
        <div className={styles.container}>
          <PostsWrapper>
            {
              posts.map((post, index) => {
                  return (
                    <Link  href={'/post/[id]'} as={`/post/${post._id}`} passHref key={index}>
                      <PostItem>
                        <PostImage img={post.imgUrl}/>
                        <PostFooter>
                          <PostTitle>{post.title}</PostTitle>
                        </PostFooter>
                    </PostItem> 
                    </Link>
                  )
              })
            }
          </PostsWrapper>
        </div>
      </Wrapper>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://mern-travel-blog.herokuapp.com/api/post`)
  const posts = await res.json()

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {posts}
  }
}

