
/*
  File: src/data/defaultExams.js

  Purpose:
  This file contains the default examinations for ExamFlow.

  Examinations:
  1. Web Development Fundamentals
  2. JavaScript Essentials
  3. React & Frontend Architecture
  4. Data Structures & Algorithms

  Each examination contains 20 multiple-choice questions.

  Important:
  correctIndex starts from 0:
  0 = first option
  1 = second option
  2 = third option
  3 = fourth option
*/

// A helper function to create a multiple-choice question.
function createQuestion(questionText, answerOptions, correctAnswerIndex) {
  return {
    text: questionText,
    options: answerOptions,
    correctIndex: correctAnswerIndex,
  };
}

// Store all default examinations in this array.
export const defaultExams = [
  // ==========================================
  // 1. WEB DEVELOPMENT FUNDAMENTALS
  // ==========================================
  {
    id: "default-web",
    title: "Web Development Fundamentals",
    subject: "Web Development",
    duration: 30,
    status: "Available",
    description: "HTML, CSS, HTTP, accessibility, and web basics.",

    questions: [
      createQuestion(
        "What does HTML stand for?",
        [
          "HyperText Markup Language",
          "High Transfer Machine Language",
          "Hyperlink Text Management Language",
          "Home Tool Markup Language",
        ],
        0
      ),

      createQuestion(
        "Which HTML element creates a hyperlink?",
        ["<link>", "<a>", "<href>", "<url>"],
        1
      ),

      createQuestion(
        "Which HTML element displays an image?",
        ["<picture-text>", "<src>", "<img>", "<image-link>"],
        2
      ),

      createQuestion(
        "Which CSS property changes text color?",
        ["font-style", "background-color", "text-decoration", "color"],
        3
      ),

      createQuestion(
        "Which CSS layout system is one-dimensional?",
        ["Flexbox", "Grid", "Table layout", "Float layout"],
        0
      ),

      createQuestion(
        "Which CSS property adds space inside an element's border?",
        ["margin", "padding", "outline", "gap only"],
        1
      ),

      createQuestion(
        "Which selector targets an element with id='header'?",
        [".header", "*header", "#header", "header#"],
        2
      ),

      createQuestion(
        "What does CSS stand for?",
        [
          "Computer Style Syntax",
          "Creative Styling System",
          "Cascading Script Sheets",
          "Cascading Style Sheets",
        ],
        3
      ),

      createQuestion(
        "Which HTTP method is commonly used to retrieve data?",
        ["GET", "POST", "PATCH", "DELETE"],
        0
      ),

      createQuestion(
        "Which HTTP status code means Not Found?",
        ["200", "404", "301", "500"],
        1
      ),

      createQuestion(
        "What is the purpose of a semantic HTML element?",
        [
          "To execute JavaScript",
          "To add database tables",
          "To describe the meaning of content",
          "To encrypt page data",
        ],
        2
      ),

      createQuestion(
        "Which attribute provides alternative text for an image?",
        ["title-only", "src", "href", "alt"],
        3
      ),

      createQuestion(
        "Which HTML element is used for the largest standard heading?",
        ["<h1>", "<h6>", "<head>", "<heading>"],
        0
      ),

      createQuestion(
        "Which CSS unit is relative to the root element's font size?",
        ["px", "rem", "cm", "pt"],
        1
      ),

      createQuestion(
        "Which tag normally contains metadata and the page title?",
        ["<body>", "<footer>", "<head>", "<main>"],
        2
      ),

      createQuestion(
        "What does responsive web design aim to achieve?",
        [
          "Fixed desktop-only layouts",
          "Faster database queries",
          "Automatic password encryption",
          "Layouts that adapt to different screen sizes",
        ],
        3
      ),

      createQuestion(
        "Which attribute opens a link in a new browsing context when set to '_blank'?",
        ["target", "rel", "action", "method"],
        0
      ),

      createQuestion(
        "Which browser feature stores key-value data across browser restarts?",
        [
          "sessionStorage only",
          "localStorage",
          "CSS variables",
          "DOM attributes only",
        ],
        1
      ),

      createQuestion(
        "What is the DOM?",
        [
          "A CSS framework",
          "A web hosting protocol",
          "A programming language",
          "A tree representation of a document",
        ],
        3
      ),

      createQuestion(
        "Which protocol secures HTTP communication using TLS?",
        ["FTP", "SMTP", "HTTPS", "Telnet"],
        2
      ),
    ],
  },

  // ==========================================
  // 2. JAVASCRIPT ESSENTIALS
  // ==========================================
  {
    id: "default-js",
    title: "JavaScript Essentials",
    subject: "JavaScript",
    duration: 35,
    status: "Available",
    description:
      "Variables, functions, arrays, objects, and asynchronous JavaScript.",

    questions: [
      createQuestion(
        "Which keyword declares a block-scoped variable that can be reassigned?",
        ["let", "const", "static", "final"],
        0
      ),

      createQuestion(
        "Which operator checks strict equality in JavaScript?",
        ["=", "===", "==", "!="],
        1
      ),

      createQuestion(
        "What is the result of typeof []?",
        ["array", "null", "object", "undefined"],
        2
      ),

      createQuestion(
        "Which array method creates a new array by transforming each element?",
        ["filter", "find", "reduce", "map"],
        3
      ),

      createQuestion(
        "Which value represents the intentional absence of an object value?",
        ["null", "NaN", "false", "0"],
        0
      ),

      createQuestion(
        "Which declaration cannot be reassigned after initialization?",
        ["var", "const", "let", "function"],
        1
      ),

      createQuestion(
        "What does Array.isArray([]) return?",
        ["undefined", "0", "true", "false"],
        2
      ),

      createQuestion(
        "Which syntax creates an arrow function?",
        ["function => {}", "function() -> {}", "-> function {}", "() => {}"],
        3
      ),

      createQuestion(
        "Which method converts a JSON string into a JavaScript value?",
        [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.convert()",
          "JSON.read()",
        ],
        0
      ),

      createQuestion(
        "What does Promise.all() do when all supplied promises fulfill?",
        [
          "Runs only the first promise",
          "Fulfills with an array of results",
          "Converts promises to callbacks",
          "Cancels every promise",
        ],
        1
      ),

      createQuestion(
        "Which keyword pauses an async function until a promise settles?",
        ["defer", "pause", "await", "yield"],
        2
      ),

      createQuestion(
        "What does the spread syntax look like?",
        ["**value", "...value", "&&value", "::value"],
        1
      ),

      createQuestion(
        "Which array method returns a new array containing matching elements?",
        ["map", "reduce", "forEach", "filter"],
        3
      ),

      createQuestion(
        "What is the result of Boolean('')?",
        ["false", "true", "null", "undefined"],
        0
      ),

      createQuestion(
        "Which method adds an item to the end of an array?",
        ["shift()", "push()", "unshift()", "pop()"],
        1
      ),

      createQuestion(
        "What does addEventListener() do?",
        [
          "Creates a database",
          "Changes an element's CSS permanently",
          "Registers an event handler",
          "Imports a module",
        ],
        2
      ),

      createQuestion(
        "Which statement handles an exception?",
        ["if/else only", "switch/case", "for/catch", "try/catch"],
        3
      ),

      createQuestion(
        "What is a closure?",
        [
          "A function with access to its lexical scope after the outer function returns",
          "A closed browser tab",
          "A CSS selector",
          "A class constructor only",
        ],
        0
      ),

      createQuestion(
        "Which operator provides a fallback only when the left side is null or undefined?",
        ["||", "??", "&&", "==="],
        1
      ),

      createQuestion(
        "Which keyword is used to define a class in JavaScript?",
        ["object", "struct", "class", "interface"],
        2
      ),
    ],
  },

  // ==========================================
  // 3. REACT & FRONTEND ARCHITECTURE
  // ==========================================
  {
    id: "default-react",
    title: "React & Frontend Architecture",
    subject: "React",
    duration: 40,
    status: "Available",
    description:
      "Components, props, hooks, routing, and frontend architecture.",

    questions: [
      createQuestion(
        "What is React primarily used for?",
        [
          "Building user interfaces",
          "Managing relational databases",
          "Operating system development",
          "Writing SQL queries",
        ],
        0
      ),

      createQuestion(
        "What is a React component?",
        [
          "A database record",
          "A reusable UI building block",
          "A CSS unit",
          "A network protocol",
        ],
        1
      ),

      createQuestion(
        "Which hook is commonly used to manage local component state?",
        ["useRoute", "useStyle", "useState", "useClass"],
        2
      ),

      createQuestion(
        "What are props used for?",
        [
          "Storing browser passwords",
          "Replacing all state",
          "Starting the development server",
          "Passing data to components",
        ],
        3
      ),

      createQuestion(
        "Why should React list items have stable keys?",
        [
          "To help React identify items between renders",
          "To encrypt list values",
          "To add CSS automatically",
          "To create routes",
        ],
        0
      ),

      createQuestion(
        "Which hook is commonly used for side effects?",
        ["useMemo", "useEffect", "useParams", "useId only"],
        1
      ),

      createQuestion(
        "What should a controlled input's value normally be connected to?",
        [
          "A CSS class",
          "A route path",
          "React state",
          "The browser title",
        ],
        2
      ),

      createQuestion(
        "Which syntax is used to embed JavaScript expressions in JSX?",
        ["<% expression %>", "[[expression]]", "${expression}", "{expression}"],
        3
      ),

      createQuestion(
        "What is the purpose of React Router?",
        [
          "Client-side navigation and route rendering",
          "Database indexing",
          "Image compression",
          "Password hashing",
        ],
        0
      ),

      createQuestion(
        "What does useParams() typically return?",
        [
          "Component CSS",
          "Route parameters",
          "An HTTP response automatically",
          "A database connection",
        ],
        1
      ),

      createQuestion(
        "What does lifting state up mean?",
        [
          "Moving CSS to another file",
          "Deleting component state",
          "Moving shared state to a common ancestor",
          "Replacing props with localStorage",
        ],
        2
      ),

      createQuestion(
        "Which approach is recommended for updating state based on its previous value?",
        [
          "state = state + 1",
          "Direct DOM mutation",
          "Editing the state object in place",
          "Using a functional state updater",
        ],
        3
      ),

      createQuestion(
        "What does conditional rendering mean?",
        [
          "Rendering UI based on a condition",
          "Rendering every route at once",
          "Loading only CSS",
          "Compiling JSX manually",
        ],
        0
      ),

      createQuestion(
        "Which hook memoizes a calculated value?",
        ["useEffect", "useMemo", "useNavigate", "useParams"],
        1
      ),

      createQuestion(
        "What is the purpose of React.Fragment?",
        [
          "To add a new DOM element always",
          "To create a browser session",
          "To group elements without an extra DOM wrapper",
          "To define a database schema",
        ],
        2
      ),

      createQuestion(
        "When should an effect's cleanup function run?",
        [
          "Only before the first render",
          "Only after a button click",
          "Only when the browser closes",
          "Before the effect reruns and on unmount",
        ],
        3
      ),

      createQuestion(
        "What is a single-page application?",
        [
          "An application that updates views without full-page navigation for every route",
          "A website with exactly one component",
          "A static image",
          "An application without JavaScript",
        ],
        0
      ),

      createQuestion(
        "Why should passwords not be stored in localStorage for production authentication?",
        [
          "It cannot store strings",
          "Client-side storage is accessible to scripts and users",
          "It expires every second",
          "React cannot read it",
        ],
        1
      ),

      createQuestion(
        "What does lazy loading commonly improve?",
        [
          "Database normalization",
          "Password strength",
          "Initial bundle loading by deferring code",
          "CSS selector specificity",
        ],
        2
      ),

      createQuestion(
        "What does Vite provide in a React project?",
        [
          "A relational database",
          "User authentication by default",
          "A replacement for React components",
          "Development server and build tooling",
        ],
        3
      ),
    ],
  },

  // ==========================================
  // 4. DATA STRUCTURES & ALGORITHMS
  // ==========================================
  {
    id: "default-dsa",
    title: "Data Structures & Algorithms",
    subject: "DSA",
    duration: 45,
    status: "Available",
    description:
      "Complexity, arrays, linked lists, stacks, trees, graphs, and sorting.",

    questions: [
      createQuestion(
        "Which data structure follows LIFO?",
        ["Stack", "Queue", "Graph", "Hash table"],
        0
      ),

      createQuestion(
        "Which data structure follows FIFO?",
        ["Stack", "Queue", "Binary tree", "Heap"],
        1
      ),

      createQuestion(
        "What is the worst-case time complexity of linear search?",
        ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        2
      ),

      createQuestion(
        "What is the time complexity of binary search on a sorted array?",
        ["O(n²)", "O(n)", "O(n log n)", "O(log n)"],
        3
      ),

      createQuestion(
        "Which data structure is commonly used for BFS?",
        ["Queue", "Stack only", "Sorted array only", "Recursion only"],
        0
      ),

      createQuestion(
        "Which data structure is commonly used for iterative DFS?",
        ["Queue", "Stack", "Hash function", "Priority table"],
        1
      ),

      createQuestion(
        "What is the average-case lookup complexity of a well-designed hash table?",
        ["O(n²)", "O(log n)", "O(1)", "O(n log n)"],
        2
      ),

      createQuestion(
        "Which sorting algorithm has O(n log n) worst-case time in its standard form?",
        ["Bubble sort", "Insertion sort", "Selection sort", "Merge sort"],
        3
      ),

      createQuestion(
        "Which structure is used to represent hierarchical data?",
        ["Tree", "Queue", "Stack", "Hash function"],
        0
      ),

      createQuestion(
        "Which traversal visits left subtree, root, then right subtree in a binary tree?",
        ["Preorder", "Inorder", "Postorder", "Level order"],
        1
      ),

      createQuestion(
        "What is the worst-case time complexity of quicksort?",
        ["O(1)", "O(log n)", "O(n²)", "O(n)"],
        2
      ),

      createQuestion(
        "Which data structure efficiently supports extracting the maximum or minimum element?",
        [
          "Plain linked list only",
          "Stack",
          "Unsorted string",
          "Heap",
        ],
        3
      ),

      createQuestion(
        "What is the time complexity of inserting at the head of a linked list?",
        ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        0
      ),

      createQuestion(
        "Which technique solves a problem by combining overlapping subproblems?",
        [
          "Linear search",
          "Dynamic programming",
          "Selection sort",
          "Hash collision",
        ],
        1
      ),

      createQuestion(
        "Which algorithm finds shortest paths from a source with non-negative edge weights?",
        [
          "DFS",
          "Bubble sort",
          "Dijkstra's algorithm",
          "Binary search",
        ],
        2
      ),

      createQuestion(
        "What is the auxiliary space complexity of an iterative binary search?",
        ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        3
      ),

      createQuestion(
        "Which algorithm repeatedly compares adjacent elements and swaps them if needed?",
        [
          "Bubble sort",
          "Merge sort",
          "Dijkstra's algorithm",
          "Binary search",
        ],
        0
      ),

      createQuestion(
        "Which data structure is suitable for implementing undo operations?",
        ["Queue", "Stack", "Graph", "Min-heap"],
        1
      ),

      createQuestion(
        "What is the time complexity of accessing an array element by index?",
        ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        2
      ),

      createQuestion(
        "Which algorithmic technique explores candidate solutions and abandons invalid partial solutions?",
        [
          "Hashing",
          "Counting sort",
          "Prefix sum",
          "Backtracking",
        ],
        3
      ),
    ],
  },
];

// Export the same data as the default export as well.
export default defaultExams;
