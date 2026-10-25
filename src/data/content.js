// All copy and asset paths for the home page.

export const navItems = [
  { label: 'Home', href: '#home', anchor: 'home' },
  { label: 'About', href: '#about', anchor: 'about' },
  { label: 'Stack', href: '#stack', anchor: 'stack' },
  { label: 'Skills', href: '#services', anchor: 'services' },
  { label: 'Projects', href: '#projects', anchor: 'projects' },
  { label: 'Contact', href: '#contact', anchor: 'contact' },
]

export const heroTicker = [
  { text: 'UI/UX Designer' },
  { text: 'Mastering DSA' },
  { text: 'Aspiring Cloud Engineer' },
]

// Paragraph segments: plain strings are regular text, { b } are bold.
export const aboutCards = [
  [
    'Hi, I am Mihitha Viharini , I am currently pursuing a ',
    { b: 'B.Sc. degree at BITS' },
    ', where I have developed strong ',
    { b: 'technical knowledge' },
    ' and ',
    { b: 'interpersonal skills' },
    '. My academic journey at ',
    { b: 'NIAT' },
    ' has further equipped me with practical expertise in ',
    { b: 'Python, HTML, CSS, and Java' },
    ', strengthening my ',
    { b: 'problem-solving' },
    ' and ',
    { b: 'coding abilities' },
    '.',
  ],
  [
    'Beyond academics, I take pride in my ',
    { b: 'multitasking skills, creative thinking, and sportive spirit' },
    ', which drive me to perform well both in studies and extracurricular activities. As a ',
    { b: 'national-level hockey player' },
    ', I have cultivated qualities of ',
    { b: 'discipline, teamwork, and resilience' },
    ', which I carry into every challenge I undertake.',
  ],
  [
    'I have actively participated in various ',
    { b: 'technical and creative events' },
    ', including ',
    { b: 'UI/UX workshops, cybersecurity workshops, hackathons, and design competitions' },
    '. These experiences have enhanced my problem-solving skills, creativity, and teamwork while giving me exposure to real-world applications and collaborative innovation.',
  ],
]

export const stack = [
  {
    name: 'HTML',
    logo: 'html',
    text: 'HTML5 is the backbone of my web design work. I use it to structure content, ensuring that websites are semantically meaningful and accessible. It forms the foundation upon which the visual elements of a site are built.',
  },
  {
    name: 'CSS',
    logo: 'css',
    text: "CSS3 is my styling and layout powerhouse. It's instrumental in creating visually appealing websites by controlling everything from fonts and colors to the responsive design that adapts to various screen sizes.",
  },
  {
    name: 'Framer',
    logo: 'framer',
    text: 'Framer revolutionizes my web design workflow. It goes beyond a simple website builder, offering a visual playground where I can craft stunning and interactive websites without getting bogged down in complex code.',
  },
  {
    name: 'Figma',
    logo: 'figma',
    text: 'Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based approach streamlines the design process.',
  },
  {
    name: 'JavaScript',
    logo: 'javascript',
    text: '“JavaScript is a powerful programming language mainly used in web development. It makes websites interactive by adding features like animations, form validations, and dynamic content updates.”',
  },
  {
    name: 'ChatGPT',
    logo: 'chatgpt',
    text: 'ChatGPT is my content generation and assistance tool. I leverage it for content ideas, copywriting, and problem-solving. It provides invaluable insights and suggestions that enhance the quality of my projects.',
  },
  {
    name: 'C Language',
    logo: 'cLang',
    text: 'C is a powerful general-purpose programming language known as the foundation of many modern languages. It is widely used for system programming, operating systems, and embedded systems.',
  },
  {
    name: 'C++',
    logo: 'cpp',
    text: 'C++ is an object-oriented programming language that builds on the foundation of C. It is widely used for competitive programming, software development, and game engines. It is also commonly used to practice Data Structures and Algorithms.',
  },
  {
    name: 'React JS',
    logo: 'react',
    text: 'React.js is a popular JavaScript library used for building dynamic and interactive user interfaces. It follows a component-based architecture, allowing developers to create reusable UI elements.',
  },
  {
    name: 'Node JS',
    logo: 'node',
    text: 'Node.js is a runtime environment that allows JavaScript to run on the server side. It is widely used for building fast, scalable, and real-time applications.',
  },
  {
    name: 'MySQL',
    logo: 'mysql',
    text: 'MySQL is a widely used relational database management system that stores and organizes data in tables. It uses SQL (Structured Query Language) to manage and retrieve information efficiently. MySQL is known for its speed, reliability, and scalability, making it popular for web applications.',
  },
]

export const skills = [
  {
    title: 'HTML AND CSS',
    logos: ['html', 'css'],
    text: '“I started my B.Tech journey by diving into HTML and CSS in the very first three months. Since then, I’ve built a few websites and enjoyed experimenting with design and creativity while shaping my portfolio.”',
    shape: { src: '/images/nSf6ya4FcQ5iCpFIBAboozmlgzA.png', alt: 'Red Pyramid', size: 278, rotate: -10 },
  },
  {
    title: 'Python Programming',
    logos: ['python'],
    text: '“I have developed a solid foundation in Python, focusing on core concepts such as data structures, functions, object-oriented programming, and problem-solving. I enjoy applying Python to practical projects and continue to strengthen my skills by exploring advanced topics and real-world applications.”',
    shape: { src: '/images/fbDdTEyddMlUKyioryX3T3M3I.png', alt: 'Blue Cube', size: 240, rotate: 0 },
  },
  {
    title: 'JavaScript',
    logos: ['javascript'],
    text: '“I have gained strong knowledge of JavaScript, enabling me to add interactivity and dynamic functionality to web applications. From working with DOM manipulation to implementing logical problem-solving approaches, I continue to refine my skills to build responsive and user-friendly web solutions.”',
    shape: { src: '/images/un1NlasO4xdJ3ogUjNzC5U3NsU.png', alt: 'Green Cylinder', size: 294, rotate: -15 },
  },
  {
    title: 'C Language',
    logos: ['cLang'],
    text: '“I have a good command of C language, which has helped me strengthen my understanding of programming fundamentals, memory management, and problem-solving. By practicing concepts such as arrays, pointers, functions, and algorithms, I have built a strong base for learning advanced programming languages and technologies.”',
    shape: { src: '/images/gshDWTLuPfNPn8ZUFpq49jhvIPk.png', alt: 'Orange Sphere', size: 240, rotate: 0 },
  },
  {
    title: 'UI/UX Design',
    logos: ['figma', 'framer'],
    text: '“I have hands-on experience in UI/UX design, from planning layouts and wireframes to building clickable prototypes in Figma and Framer. Through UI/UX workshops, hackathons, and design competitions, I have learned to understand user needs, keep interfaces clean and consistent, and polish small interactions so that every product feels simple and intuitive to use.”',
    shape: { src: '/images/l1KkpEI9tJzqQPgJDNKytRuxgeI.png', alt: 'Turquoise Star', size: 240, rotate: 15 },
  },
  {
    title: 'DSA in C++',
    logos: ['cpp'],
    text: '“I have practiced Data Structures and Algorithms in C++, which has enhanced my logical thinking and problem-solving abilities. By working with arrays, linked lists, stacks, queues, trees, and sorting/searching algorithms, I have built a strong foundation to approach coding challenges efficiently and write optimized solutions.”',
    shape: { src: '/images/2YMs3TUoFSk6OAJu3tquJSjY.png', alt: 'Purple Circle', size: 339, rotate: -45 },
  },
  {
    title: 'MySQL',
    logos: ['mysql'],
    text: '“I have worked with MySQL to understand the fundamentals of databases, including creating, managing, and querying data. By practicing concepts such as joins, constraints, normalization, and stored procedures, I have gained the ability to design efficient databases and integrate them into applications.”',
    shape: { src: '/images/eiTxkfpr6msnt5xKhves6aFLlTw.png', alt: 'Yellow Heart', size: 319, rotate: 25 },
  },
  {
    title: 'React JS',
    logos: ['react'],
    text: '“I have experience working with React.js to build dynamic and component-based web applications. By utilizing concepts like hooks, state management, props, and reusable components, I focus on creating interactive, scalable, and user-friendly interfaces that enhance the overall web experience.”',
    shape: { src: '/images/YnQwe4Efg37DiOr8IRYEfPzKE.png', alt: 'Orange Star', size: 294, rotate: -15 },
  },
  {
    title: 'Node JS',
    logos: ['node'],
    text: '“I am currently learning Node.js to strengthen my backend development skills. By exploring concepts like server-side programming, APIs, and database connectivity, I aim to build full-stack applications and gain a deeper understanding of how front-end and back-end integrate seamlessly.”',
    shape: { src: '/images/snuvetWlg8kNNuH4rBY2aSQch5c.png', alt: 'Blue Gem', size: 240, rotate: 0 },
  },
]

export const links = {
  linkedin: 'https://www.linkedin.com/in/mihamviha2026',
  github: 'https://github.com/mihithaviha',
  email: 'viharinimihitha@gmail.com',
  phone: '9490661981',
}
