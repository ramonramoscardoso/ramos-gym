# Gym Workout Planner 💪

> **Learning Journey:** This is my first project using [Claude Code](https://claude.ai/code), an AI coding agent by Anthropic. I'm creating this application to study and understand more about how coding agents can assist in software development, while simultaneously building a practical fitness application.

## 🎯 About This Project

This project serves a dual purpose:
1. **Learning Tool**: Exploring the capabilities of AI-powered coding assistants and understanding how they can enhance the development workflow
2. **Practical Application**: Building a personalized gym workout planner that collects user information and generates customized fitness plans

## 🤖 Working with Claude Code

### What I'm Learning:
- How to effectively collaborate with an AI coding agent
- Breaking down complex features into manageable tasks
- Understanding architectural decisions through AI-guided planning
- Best practices in modern web development (Next.js 14, TypeScript, i18n)
- Implementing multi-step forms with proper validation
- Building accessible, responsive, and internationalized applications

### Development Approach:
- Used Claude Code's planning mode to design the questionnaire feature
- Broke down implementation into clear, trackable tasks
- Leveraged AI assistance for TypeScript types, component architecture, and i18n setup
- Learned about Next.js App Router patterns and next-intl integration

## ✨ Features Implemented

### Current Features (v0.1)

✅ **Multi-Step Questionnaire** (4 steps)
- Step 1: Personal Information (age, weight, height, gender)
- Step 2: Fitness Goals & Experience Level
- Step 3: Availability & Resources (days/week, time/session, equipment access)
- Step 4: Health Conditions & Limitations

✅ **Internationalization (i18n)**
- Full support for Portuguese (pt-BR) and English (en-US)
- Language switcher in the header
- All content translated including form labels, validation messages, and UI text

✅ **Dark Mode Support**
- Complete dark/light theme toggle
- Persisted theme preference using `next-themes`
- Optimized contrast for both themes

✅ **Form Validation**
- Real-time validation on form submission
- Clear error messages per field
- Required field validation
- Number range validation (age, weight, height)

✅ **Responsive Design**
- Mobile-first approach
- Works on all screen sizes (320px to 1920px+)
- Touch-friendly interface

✅ **Data Persistence**
- Form data saved to localStorage on submission
- Data logged to console for debugging
- Ready for API integration (future implementation)

## 🛠️ Tech Stack

- **Framework:** [Next.js 14.2](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Internationalization:** [next-intl 4.7](https://next-intl-docs.vercel.app/)
- **Theme Management:** [next-themes 0.4.6](https://github.com/pacocoursey/next-themes)
- **Runtime:** [React 18.3](https://react.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ramon-gyno.git
cd ramon-gyno
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing the Application

1. Click "Get Started" on the home page
2. Fill out the 4-step questionnaire
3. Try switching between languages (PT/EN)
4. Toggle dark/light mode
5. Test validation by leaving fields empty
6. Navigate back and forth between steps
7. Submit the form and check the browser console for the logged data

## 📁 Project Structure

```
ramon-gyno/
├── app/
│   ├── [locale]/                    # Locale-based routing
│   │   ├── layout.tsx              # Locale layout with providers
│   │   ├── page.tsx                # Home page
│   │   └── questionnaire/
│   │       └── page.tsx            # Questionnaire page
│   ├── globals.css                 # Global styles
│   └── layout.tsx                  # Root layout
├── components/
│   ├── questionnaire/              # Questionnaire feature
│   │   ├── QuestionnaireWizard.tsx # Main wizard container
│   │   ├── StepIndicator.tsx      # Progress indicator
│   │   ├── NavigationButtons.tsx  # Navigation controls
│   │   ├── steps/                 # Step components
│   │   │   ├── PersonalInfoStep.tsx
│   │   │   ├── GoalsExperienceStep.tsx
│   │   │   ├── AvailabilityStep.tsx
│   │   │   └── HealthLimitationsStep.tsx
│   │   └── form-fields/           # Reusable form components
│   │       ├── NumberInput.tsx
│   │       ├── UnitSelector.tsx
│   │       ├── RadioGroup.tsx
│   │       └── CheckboxGroup.tsx
│   ├── providers/
│   │   └── theme-provider.tsx     # Theme provider wrapper
│   ├── language-switcher.tsx      # Language selector
│   └── theme-switcher.tsx         # Theme toggle
├── messages/                       # i18n translations
│   ├── pt-BR.json                 # Portuguese translations
│   └── en-US.json                 # English translations
├── types/
│   └── questionnaire.ts           # TypeScript interfaces
├── i18n.ts                        # i18n configuration
├── middleware.ts                  # next-intl middleware
├── navigation.ts                  # Internationalized navigation
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🎨 Design Decisions

### Color Scheme
- **Primary:** Blue (`blue-600`, `blue-700`)
- **Neutral:** Gray scale (`gray-50` to `gray-900`)
- **Semantic:** Red for errors, Green for success (future)

### Form Architecture
- **State Management:** React `useState` (no external libraries)
- **Validation:** Custom validation logic per step
- **Navigation:** Linear progression with back navigation support
- **Data Structure:** Nested state object with typed interfaces

### Internationalization Strategy
- Separate translation files per locale
- Nested translation keys for organization
- Dynamic content using next-intl's `useTranslations` hook

## 🗺️ Roadmap / Future Features

### Next Steps (In Order):
1. ✅ **Questionnaire Feature** - Completed
2. ⏳ **LLM Integration** - Create endpoints to call AI API for gym plan generation
3. ⏳ **Plan Display** - Create pages to display generated workout plans with day-by-day details
4. ⏳ **Database Setup** - Implement Postgres database to store user plans
5. ⏳ **API Endpoints** - Create CRUD endpoints for database interaction

### Additional Enhancements:
- User authentication and account management
- Save/edit questionnaire drafts
- Multiple workout plan versions per user
- Exercise library with instructions and videos
- Progress tracking and workout logging
- Social features (share plans, community)
- Mobile app version
- Integration with fitness trackers

## 📚 What I Learned

### Technical Skills:
- Next.js 14 App Router architecture
- TypeScript type safety and interfaces
- Internationalization with next-intl
- Dark mode implementation
- Form validation patterns
- Component composition and reusability

### AI-Assisted Development:
- How to break down features into plannable tasks
- Effective prompting for code generation
- Architectural decision-making with AI guidance
- Code review and iteration with AI assistance
- Understanding trade-offs in different approaches

### Best Practices:
- Separation of concerns (components, types, utilities)
- Consistent styling patterns
- Accessible form design
- Responsive mobile-first design
- Type-safe development with TypeScript

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or suggestions
- Submit pull requests for improvements
- Share your thoughts on the AI-assisted development approach

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Claude Code by Anthropic** - For making this learning journey possible
- **Next.js Team** - For an amazing React framework
- **Tailwind CSS** - For rapid UI development
- **next-intl** - For seamless internationalization

---

**Built with 🤖 Claude Code + 💻 Human Creativity**

*This README was created as part of my journey learning to work with AI coding agents. The entire project serves as a case study in AI-assisted software development.*
