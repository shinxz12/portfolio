
export const projectsData = [
    {
        id: 1,
        name: 'The Luxe Nomad',
        description: 'Developed features for The Luxe Nomad, Asia-Pacific\'s largest luxury vacation rental management company',
        tools: ['Django', 'ReactJS', 'Bootstrap', 'Google Cloud Platform', 'PostgreSQL'],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        responsibilities: ['Consulted with clients to analyse business requirements, propose solutions, and answer technical queries',
            'Designed and implemented RESTful APIs using Django and integrated third-party APIs for booking, sales, and marketing',
            'Integrated Google Sheet API for automated reporting',
            'Participated in designing and implementing a new front-end design using ReactJS and Bootstrap',
            'Migrated Celery tasks and cron jobs to Google Cloud Task Queue and Cronjobs',
            'Upgraded Django from version 2 to 4',
            'Managed application deployment and ensured optimal performance, security, and cost efficiency',
            'Reviewed code, wrote unit tests, and collaborated with team members to maintain code quality']
    },
    {
        id: 2,
        name: 'Hoplite Technology',
        description: 'Hoplite Technology provides cybersecurity awareness training and builds AI tools for education.',
        tools: ['TypeScript', 'ReactJS', 'NextJS', 'Tailwind', 'Lambda AWS', 'FastAPI', 'Flask', 'MongoDB', 'nginx', 'OpenAI API', 'Stripe'],
        code: '',
        role: 'Software Engineer',
        demo: '',
        responsibilities: ['Maintained and debugged existing training pages built with TypeScript and ReactJS',
            'Developed AI-powered tools for a chat page using NextJS and ChatGPT',
            'Designed and implemented RESTful APIs with AWS Lambda and API Gateway using Python',
            'Optimized code to improve page load speed and API responsiveness',
            'Implemented streaming responses to handle API Gateway timeout issues',
            'Set up reverse proxy by using nginx']
    },
    {
        id: 3,
        name: 'Finexis eKYC (Finexis advisory)',
        description: "Finexis eKYC helps to automate the KYC process. So the company can know the customer is safe.",
        responsibilities: ['Built new eKYC types and implemented RESTful APIs for mobile integration',
            'Configured Celery for background job processing',
            'Integrated insurance third-party APIs',
            'Debugged and refactored existing code to improve maintainability',
            'Optimized SQL queries and database structure, resulting in significant page load time reduction (from 23 seconds to 2 seconds and 26 seconds to 5 seconds)'],
        tools: ['Django', 'MySQL', 'AWS'],
        code: '',
        demo: '',
        role: 'Software Engineer',
    },
    {
        id: 4,
        name: 'Watchtowr',
        description: "Providing security services for non-physical assets such as domains, cloud credentials, etc.",
        tools: ['NextJS', 'NestJS', 'ChakraUI', 'Apollo', 'GraphQL', 'Kafka'],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        responsibilities: ['Developing UI and APIs for integrating new assets',
            'Maintaining and fixing bugs',
            'Generating PDF reports for new assets']
    },
    {
        id: 5,
        name: 'TurisVPN',
        description: 'A VPN application for mobile and web extensions',
        tools: ['Django', 'Celery', 'Django Admin'],


        role: 'Backend Developer',
        code: '',
        demo: '',
        responsibilities: ['Developing an email blast feature for marketing allows admin users to create email content and schedule sends using CKeditor5 and Celery',
            'Set up performance debugging tools and fix the N, N+1 query issue to boost admin page performance']
    },
    {
        id: 6,
        name: 'Clinger',
        description: "Developing and maintaining the backend for a mobile dating application, similar to Tinder, with features for matching, messaging, and user profiles",
        tools: ['NestJS', 'TypeScript', 'PostgreSQL'],
        role: 'Backend Developer',
        code: '',
        demo: '',
        responsibilities: ['Implementing core application logic and features using NestJS to ensure stability and responsiveness for a growing user base',
            'Analysing and optimising database queries to improve application speed and efficiency. Redesigned database schemas to enhance data integrity and performance',
            'Refactoring and improving the existing codebase to increase maintainability and readability. Implementing best practices for code organisation and testing',
            'Developing and integrating content moderation features, including nude detection, to ensure a safe and appropriate user experience']
    }
];


export const projectsData1 = [
    {
        name: 'The Luxe Nomad',
        description: 'Developed and maintained key features for the Booking Manager platform of a luxury vacation rental management company. Led API development with Django to streamline booking, sales, and marketing processes, integrating third-party services. Implemented Google Sheets automation for reporting. Redesigned the front-end with ReactJS and Bootstrap to enhance user experience. Migrated Celery tasks and cron jobs to Google Cloud Task Queue, improving performance and scalability. Upgraded Django from version 2 to 4, ensuring security and long-term stability.',
        tools: ['Django', 'ReactJS', 'Bootstrap', 'Google Cloud Platform', 'PostgreSQL'],
        role: 'Full Stack Developer',
        priority: 1
    },
    {
        name: 'Hoplite Technology',
        description: 'Enhanced cybersecurity awareness training platforms built with TypeScript and ReactJS. Developed AI-powered chat tools using NextJS and OpenAI API, enabling interactive learning experiences. Built and optimized RESTful APIs with AWS Lambda and FastAPI to improve responsiveness. Addressed API Gateway timeout issues by implementing streaming responses. Configured nginx reverse proxy for improved security and load balancing. Optimized front-end and back-end performance, leading to faster page load times and better user engagement.',
        tools: ['TypeScript', 'ReactJS', 'NextJS', 'Tailwind', 'Lambda AWS', 'FastAPI', 'Flask', 'MongoDB', 'nginx', 'OpenAI API', 'Stripe'],
        role: 'Software Engineer',
        priority: 2
    },
    {
        name: 'Finexis eKYC (Finexis Advisory)',
        description: 'Developed new eKYC verification types and RESTful APIs for mobile integration, improving customer onboarding automation. Configured Celery for efficient background job processing. Integrated third-party insurance APIs, enabling real-time policy validation. Refactored and debugged existing code to enhance maintainability. Optimized database queries and schema, reducing page load times from 23 seconds to 2 seconds and from 26 seconds to 5 seconds, significantly enhancing system performance.',
        tools: ['Django', 'MySQL', 'AWS'],
        role: 'Software Engineer',
        priority: 3
    },
    {
        name: 'Watchtowr',
        description: 'Developed and maintained UI components and backend services for security asset management. Built GraphQL APIs using Apollo and NestJS to support dynamic data integration. Designed and implemented automated PDF reporting for security insights. Fixed critical bugs and optimized system performance. Integrated Kafka for real-time data streaming, enhancing monitoring capabilities and ensuring high availability for security event processing.',
        tools: ['NextJS', 'NestJS', 'ChakraUI', 'Apollo', 'GraphQL', 'Kafka'],
        role: 'Full Stack Developer',
        priority: 4
    },
    {
        name: 'TurisVPN',
        description: 'Developed an email blast feature for marketing, enabling admin users to create, schedule, and send campaigns using CKEditor5 and Celery. Implemented performance debugging tools and optimized database queries, resolving N+1 query issues to boost admin panel speed. Improved system stability and reliability, reducing query execution times and enhancing the overall user experience for administrators.',
        tools: ['Django', 'Celery', 'Django Admin'],
        role: 'Backend Developer',
        priority: 5
    },
    {
        name: 'Clinger',
        description: 'Engineered and optimized the backend for a mobile dating application with real-time matching, messaging, and user profile management. Designed and implemented scalable database structures with PostgreSQL, significantly improving query performance. Refactored legacy code for better maintainability and efficiency. Integrated AI-powered content moderation, including automated nude detection, to ensure a safe and appropriate platform environment.',
        tools: ['NestJS', 'TypeScript', 'PostgreSQL'],
        role: 'Backend Developer',
        priority: 6
    }
];
