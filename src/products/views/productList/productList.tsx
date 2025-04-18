import styles from "./productList.module.css";
import pageNotesImage from "../../../assets/product_images/page-notes-sidepanel-example.png";
import pageNotesClipBoxImageSmall from "../../../assets/product_images/page-notes-clipbox-example-small.png";

const products = [
  {
    id:"data-tracker",
    name: "Data Tracker Mobile-First Web Site",
    technologies: [
      "React",
      "AWS Amplify",
      "AWS Cognito",
      "AWS DynamoDB",
      "TypeScript",
      "Modular CSS",
      "JavaScript",
    ],
    links: [
      {
        name: "Launch",
        url: "https://datatracker.enlace.one",
      },
      {
        name: "Github",
        url: "https://github.com/enlace-one/data-tracker-react/tree/master",
      },
    ],
    description: `This app allows you to track and visualize just about any data you would 
    want to enter once a day (at most). The use cases include tracking workouts, habbits, hobbies, hours of sleep, etc.`,
    body: (
      <>
      <h3>Advantages</h3>
        <div className={styles.clearfix}>
          {/* <img className={styles.inlineImage} src={pageNotesClipBoxImageSmall}  alt={`page notes  image`}></img> */}
          <span>
            There are other products that do this, but Data Tracker has some advantages 
            over the rest.
        </span>

            <p>1. It is easier and faster to enter data into Data Tracker each day. </p>
            <p>This is because:</p>
            <ul>
                <li>It supports default values and will automatically enter them when the app is opened each day.</li>
                <li>It supports customizable macros allowing you to set entries easily off of other entries and the current date.</li>
                <li>The default view allows for easy selection and entry of data.</li>
            </ul>
            <p>2. It allows for the easy import/export of your data via CSV files so you do not get locked in.</p>
            <p>3. It supports complex values such as weight * reps and time1 - time2</p>
            <p>4. It offers the ability to graph entries for multiple categories and compare them</p>
          
        </div>
        <div className={styles.clearfix}>
        <img className={styles.inlineImageRight} src="https://raw.githubusercontent.com/enlace-one/common_static/main/topics/work-colorful.svg"  alt={`data tracker image`}></img>
          <img className={styles.inlineImageRight} src="https://raw.githubusercontent.com/enlace-one/common_static/main/topics/phone-black.svg"  alt={`data tracker image`}></img>
          <h3>Homemade Icons</h3><span>
            Data Tracker boasts a large selection of icons to add some personalization 
            and fun to the app. Feel free to put in support tickets if you have any specific
            requests for new icons.
            I created all of the icons in the app - from the favicon to 
            the menu icons to the category topic icons. I would like to shoutout {" "}
            <a href="https://freesvgeditor.com/en/svg-editor-online">
              this handy site
            </a>{" "}
            for allowing me to easily create the icons without downloading any specialized software. 
          </span>
        </div>
      </>
    ),
  },
  {
    id:"page-notes",
    name: "Page Notes Browser Extension",
    mainImage: <img
    className={styles.inlineImageRight}
     src={pageNotesImage}
     alt={`page notes image`}
   />,
    technologies: ["JavaScript", "CSS", "Chrome APIs"],
    links: [
      {
        name: "Chrome Web Store",
        url: "https%3A//chromewebstore.google.com/detail/page-notes/aibhhfddbgmonidkapcjaicoajcomaac",
      },
      { name: "Github", url: "https://github.com/enlace-one/Extension" },
    ],
    description: `Page Notes is a browser extension that I designed to tie private notes 
    to URLs and retrieve them.`,
    textBody: <span>
    Page Notes provides a markdown editor in the side panel 
that can be opened based on the URL of the current tab or through searching. While I am 
not the only one who has had this idea, I believe my implementation is quite clean and 
has some features that others lack including markdown and keyboard shortcuts.
    </span>,
    
    body: (
      <>
        
        <h3>Clip Box Feature</h3>
        {/* <div className={styles.clearfix}> */}
          <img
            className={styles.inlineImageLeft}
            src={pageNotesClipBoxImageSmall}
            alt={`page notes  image`}
          ></img>
          <span>
            I took the opportunity to fix another problem I encountered:
            retrieving very commonly used values and doing so securely. Page
            Notes has a "ClipBox" feature that supports text, textarea, and
            password style input. The values are stored securely - encrypted and
            salted - and can be easily copied using a keyboard shortcuts.
          </span>
        {/* </div> */}
      </>
    ),
  },
  {
    id:"socx",
    name: "socX Command Line Tool",
    technologies: ["Python"],
    links: [
      {
        name: "PyPi",
        url: "https://pypi.org/project/socx/",
      },
      { name: "Github", url: "https://github.com/A-Management/socX" },
    ],
    description: `socX is a command line tools with various features to fill 
    gaps that I had when using Windows. `,
    body: (
      <>
        <p>It's features are subject to change but include:</p>
        <ul>
          <li>
            Find files by name with optional regex and case-insensitive flags
          </li>
          <li>Get information on a URL, IP, or domain</li>
          <li>Combine several CSVs that have roughly the same columns</li>
        </ul>

        <p>
          Since there are a million and one command line tools with different
          flags and features, you can simply run "socx" and it will ask if you
          want to use interactive mode where it guides you through the options.
          Power users are still, of course, free to use flags as their hearts
          desire.{" "}
        </p>
      </>
    ),
  },
  // Other products...
];

const ProductList = () => (
  <>
    <h1>Product List</h1>
    <div className={styles.toc}>
        {/* <span>Contents: </span> */}
        {products.map((product, index) => (<>
          <a href={`#${product.id}`} key={product.id} className={styles.tocLink}>
            {product.name}
          </a>
          {index < products.length -1 && ' | '}
          </>
        ))}
    </div>
    <div className={styles.productList}>
      {products.map((product) => (
        <div key={product.name} className={styles.productCard}>
           
          <h2 id={product.id}>{product.name}</h2>
          <div className={styles.clearfix}>
          {product?.mainImage}
          
          <i>Technologies Involved: {product.technologies.join(", ")}</i>
          <p>{product.description}</p>
          <div className={styles.links}>
            {product.links.map((l, index) => (
              <>
                <a href={l.url} className={styles.mainLink} target="_blank" rel="noopener noreferrer">
                  {l.name}
                </a>
                {index < product.links.length - 1 && " | "}
              </>
            ))}
            
          </div>
          
          {product.textBody} {/* Render the individual body content */}
          </div>
          {product.body}
          
        </div>
      ))}
    </div>
  </>
);

export default ProductList;
