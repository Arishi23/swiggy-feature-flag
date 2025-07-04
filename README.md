# Flag Forge Frontend

A feature flag management system built with React, TypeScript, and Firebase.

## Project Overview

### Pain Points

- As a PM, when a new feature is being introduced, I am not fully sure on whether it works at scale.  
- As a PM, when a new feature is being introduced, I want to fully confident that i won't impact any other module present in the product.  
- As a PM, I lack quantitative data to back multiple version of a feature implementation  
- As a PM, a feature can be applicable to a particular region and won't be applicable for every user.

### Potential Solutions

- As a PM, I want to create targeted set of users using various user attributes so that I can release the feature to my intented audience
- As a PM, I want to enable feature flag environment wise so that I can test it out in each environment and then move to the next environment 
- As a PM, I want to roll out the feature in a progressive manner, so that if we encounter any bugs with scale we can control the blast radius 
- As a PM, I want to view how my feature flags are being evaluated so that i can be confident that it's being triggered to external users

### Implementation Details

#### Homepage
We'll have a homepage which will introduce the users to the platform, which a quick overview of modules and then provide a CTA for start with their first action.

#### Sidebar
We'll have a sidebar which will hold 3 main modules and provide a quick navigation for the users when they have to quick between modules
- Segments  
- Feature flags  
- Insights

#### Segments
Segments will have two pages, the first one would be a listing page where we would have list of all segments that the user has created. Second would be a page where users can create a new segment. Users would be able to access the creation page from the listing page through a "Create New" button

#### Feature Flags
Feature flags will also have two pages. First one being a listing page, here users would be able to view all the feature flags that have been configured, along with their status for each of the configured environments. i.e. dev / staging / prod.  

The second page would be an feature flag details page where users would be able to enable or disable the feature flag for a set of segment and also enable a progressive rollout strategy. Progressive roll out is an optional step.

#### Insights
Insights would be a place for users to come to view how the feature flags have been evaluating. It would give them an high level overview of the usage of the platform which would include metrics such as 
- Number of feature flags created  
- Number of segments created  
- Number of evaluations  

It would also provide some insights on the features that haven't been used for a while, this is to help users to prompt them to clear those to keep their codebases clean and tidy.

## Technical Details

### Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Protected Routes
- Modern UI with Shadcn/UI components
- Firebase Integration

### Tech Stack

- React
- TypeScript
- Vite
- Firebase (Authentication)
- Shadcn/UI
- Tailwind CSS

### Getting Started

1. Clone the repository
```bash
git clone <your-repo-url>
cd flag-forge-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start the development server
```bash
npm run dev
```

### Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## License

MIT
