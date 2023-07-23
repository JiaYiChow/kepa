import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "./Footer.css";
export default function Footer() {
  return (
    <footer>
      <a href="https://www.linkedin.com/in/jia-yi-chow/">
        <FaLinkedin />
      </a>
      <a href="jcjiayichow@gmail.com">
        <HiOutlineMail />
      </a>
    </footer>
  );
}
