import { createClient } from "@/prismicio";

export default async function Footer() {

  const client = createClient();
  const settings = await client.getSingle("settings"); 

   return ( 
     <footer>
        {settings.data.site_title} - { new Date().getFullYear() }
     </footer>
   )
}