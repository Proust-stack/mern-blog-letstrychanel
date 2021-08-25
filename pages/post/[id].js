import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import arrowPic from '../../public/svg/arrow.svg'
import axios from 'axios'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
    background: #EEF5FF;
    min-height: 94vh;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ArticleWrapper = styled.div`
    background: #FEFEFE;
    border-radius: 15px;
    width: 1110px;
    min-height: 585px;
    padding: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`
const Article = styled.div`
    max-width: 475px;
    min-height: 441px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ArticleTitle = styled.div`
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #3260A1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
`
const ArticleText = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    max-height: 80%;
`
const BackBtn = styled.a`
    background: #FFFFFF;
    box-shadow: 0px 10px 25px rgba(148, 174, 213, 0.15);
    border-radius: 10px;
    position: absolute;
    width: 100px;
    height: 45px;
    left: calc(50% - 117px/2 - 496.5px);
    top: 85px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    color: #3260A1;
    transition: .3s all ease;
    :hover {
        transform: scale(1.05);
        box-shadow: 0px 10px 25px rgba(148, 174, 213, 0.45);
    }
`
const DeleteArticle = styled.a`
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    background: #EB5050;
    box-shadow: 0px 10px 25px rgba(148, 174, 213, 0.15);
    border-radius: 10px;
    position: absolute;
    width: 139px;
    height: 25px;
    left: 50%;
    bottom: -12.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%);
    cursor: pointer;
`

const Post = ({post}) => {
    const {title, text, imgUrl, _id} = post 
    const router = useRouter()
    const removePost = async () => {
        try {
            await axios.post('https://mern-travel-blog.herokuapp.com/api/post/remove', {
                postId: _id
            })
            .then(() => router.push('/'))
        } catch (error) {
            console.log(error)
        }
    }

    if (!post) return '...loading'
    return (
        <div>
            <Head>
                <title>blog | ${title}</title>
            </Head>
            <Navbar/>
            <Link  href="/" passHref>
                <BackBtn>
                    <Image
                        src={arrowPic}
                        alt="arrow"
                        width={24}
                        height={15}
                    />
                    Назад
                </BackBtn>
            </Link>
            <Wrapper>
                <ArticleWrapper>
                    <Article>
                        <ArticleTitle>{title}</ArticleTitle>
                        <ArticleText>{text}</ArticleText>
                    </Article>
                    <Image
                    src={imgUrl}
                    alt="country"
                    width={540}
                    height={316}
                    />
                    {/* <img style={{width: 540, height: 316 }} src={imgUrl}></img> */}
                    <DeleteArticle onClick={removePost}>Удалить статью</DeleteArticle>
                </ArticleWrapper>
            </Wrapper>
        </div>
    );
};

export default Post;

export async function getServerSideProps(context) {
    const res = await fetch(`https://mern-travel-blog.herokuapp.com/api/post/${context.query.id}`)
    const post = await res.json()
    console.log(post)
    if (!post) {
      return {
        notFound: true
      }
    }
  
    return {
      props: {post}
    }
  }