import { useEffect, useState } from "react";

import ProductList from "../../../common/components/ProductList/ProductList";

export default function Portfolio() {
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const storedHash =
    "e17008ad8e50ad3a396627f148fb5a6e2f62088a6c666da9021265bf750de44a";
  const salt = "p*2k8cAAj8NiYb^vns#Lg*ACzY^4dz%sG83!@CMeWinbMKEdf4";

  // Get query value on initial render
  useEffect(() => {
    const getQueryValue = () => {
      const hash = window.location.hash;
      const queryIndex = hash.indexOf("?");
      if (queryIndex === -1) return null;

      const queryString = hash.substring(queryIndex + 1);
      const params = new URLSearchParams(queryString);
      return params.get("value");
    };

    const queryValue = getQueryValue();
    setValue(queryValue);
  }, []);

  // Run hash check when value updates
  useEffect(() => {
    if (!value) return;

    async function hashValue(input: string) {
      const encoder = new TextEncoder();
      const data = encoder.encode(salt + input);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    hashValue(value).then((hashed) => {
      console.log("Hashed value:", hashed);
      if (hashed === storedHash) {
        setValid(true);
      }
    });
  }, [value]);

  if (!valid) {
    return <p>Unauthorized</p>;
  }

  const header = `${value}'s Portfolio`

  return (
    <>
        
      <ProductList is_portfolio={true} header={header} description=" Welcome! While this portfolio is generally kept anonymous, the link 
        you used was authenticated via a salted hash so you can verify the 
        owner of this site. "/>
      {/* Your portfolio content */}
    </>
  );
}
