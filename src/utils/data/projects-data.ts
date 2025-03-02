
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
