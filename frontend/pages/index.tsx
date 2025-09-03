import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa6";
import { SiLine } from "react-icons/si";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${styles.homeRoot} font-[family-name:var(--font-geist-sans)]`}>
      <main className={`${styles.homeMain} -mt-8 sm:-mt-14`}>
        {/* LOGO 與重疊圓點容器 */}
        <div className={styles.logoWrap}>
          <Image src="/logo.png" alt="What To Eat Logo" width={520} height={220} priority />

          {/* 三個圓點重疊到 LOGO 下緣 */}
          <div className={styles.loginDots}>
            <a aria-label="Google 登入" title="以 Google 登入" href={`${apiBase}/auth/google`} className={styles.dotLink}>
              <FaGoogle size={18} color="#000" />
            </a>
            <a aria-label="Facebook 登入" title="以 Facebook 登入" href={`${apiBase}/auth/facebook`} className={styles.dotLink}>
              <FaFacebookF size={18} color="#000" />
            </a>
            <a aria-label="LINE 登入" title="以 LINE 登入" href={`${apiBase}/auth/line`} className={styles.dotLink}>
              <SiLine size={18} color="#000" />
            </a>
          </div>
        </div>
        {/* 訪客登入 CTA */}
        <div className={styles.ctaWrap}>
          <button
            onClick={() => { try { localStorage.setItem("wte_guest", "1"); } catch (e) {} router.push("/paperbase"); }}
            className={styles.ctaButton}
          >
            以訪客身分登入
          </button>
        </div>
      </main>
    </div>
  );
}
