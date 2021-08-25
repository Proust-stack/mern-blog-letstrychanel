import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import arrowPic from '../public/svg/arrow.svg'
import axios from 'axios'
import { useState } from 'react';
import { useRouter } from 'next/router'

const Wrapper = styled.div`
  background: #EEF5FF;
  min-height: 94vh;
  height: 100%;
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
const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`
const Form = styled.form`
    background: #FFFFFF;
    border-radius: 15px;
    max-width: 500px;
    width: 100%;
    height: 447px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const InputField = styled.div`
    width: 100%;
`
const Input = styled.input`
    width: 100%;
    display: flex;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    height: 33px;
    outline: none;
    padding: 5px 10px;
`
const Textarea = styled.textarea`
    width: 100%;
    display: flex;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    min-height: 150px;
    outline: none;
    padding: 5px 10px;
`
const Inputlabel = styled.div`
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: #222222;
    margin: 0 auto 5px 0;
`

const AddBtn = styled.button`
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    background: #67BFFF;
    box-shadow: 0px 10px 25px rgba(148, 174, 213, 0.15);
    border-radius: 10px;
    width: 139px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: none;
`

const AddPost = () => {
    const [title, settitle] = useState('')
    const [text, settext] = useState('')
    const [imgUrl, setimgUrl] = useState('')
    const router = useRouter()
    const addPost = async () => {
            try {
                await axios.post('https://mern-travel-blog.herokuapp.com/api/post/add', {
                    title, text, imgUrl
                })
                .then(() => router.push('/'))
            } catch (error) {
                console.log(error)
            }
        };
    return (
        <div>
            <Head>
                <title>blog add post</title>
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
                <FormWrapper>
                    <Form onSubmit={e => e.preventDefault()}>
                        <InputField>
                            <Inputlabel>Название статьи:</Inputlabel>
                            <Input onChange={e => settitle(e.target.value)}/>    
                        </InputField>
                        <InputField>
                            <Inputlabel>Текст статьи:   </Inputlabel>
                            <Textarea onChange={e => settext(e.target.value)}/>    
                        </InputField>
                        <InputField>
                            <Inputlabel>URL картинки:</Inputlabel>
                            <Input onChange={e => setimgUrl(e.target.value)}/>    
                        </InputField>
                        <AddBtn onClick={addPost}>Добавить</AddBtn>
                    </Form>
                </FormWrapper>
            </Wrapper>
        </div>
    );
};

export default AddPost;