import React from 'react';
import cl from './Footer.module.scss';
import gitLogo from '@/images/git.svg';
import rsLogo from '@/images/rs.svg';

export default function Footer() {
  return (
    <footer className={cl.footer}>
      <a href="https://github.com/Folganoid/">
        <img className={cl.footer__logo} src={gitLogo} alt={'gitHub'} />
      </a>
      2023 &copy;
      <a href="https://rs.school/">
        <img className={cl.footer__logo} src={rsLogo} alt={'RSSchool'} />
      </a>
    </footer>
  );
}
