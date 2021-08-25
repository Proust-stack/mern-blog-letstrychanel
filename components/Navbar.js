import styled from 'styled-components'
import Link from 'next/link'

const Nav = styled.nav`
  background: #FEFEFE;
  padding: 17px 0;
  height: 6vh;
`
const NavbarItem = styled.div`
  position: relative;
`
const Logo = styled.a`
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    font-style: normal;
    color: #3260A1;
    padding: 5px;
`
const AddPostBtn = styled.a`
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    background: #67BFFF;
    box-shadow: 0px 10px 25px rgba(148, 174, 213, 0.15);
    border-radius: 10px;
    position: absolute;
    width: 139px;
    height: 25px;
    left: 50%;
    top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%);
    cursor: pointer;
`

export default function Navbar({ href }) {
    return (
        <Nav>
            <NavbarItem>
                <Link href="/" passHref><Logo>NEXT | BLOG</Logo></Link>
                <Link href="/add-post" passHref><AddPostBtn>Добавить статью</AddPostBtn></Link>
            </NavbarItem>
        </Nav>
    ) 
}