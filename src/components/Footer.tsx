import { createClient } from "@/prismicio";
import styles from "./Footer.module.css";

export default async function Footer() {

  const client = createClient();
  const settings = await client.getSingle("settings"); 

   return ( 
     <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <p>
          {settings.data.site_title} - { new Date().getFullYear() }
        </p>
      </div>
     </footer>
   )
}