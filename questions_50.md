# Traverse Globe Interview Questions and Easy Answers

Use these as short, point-wise answers in interviews. Keep the structure simple: what I did, how I did it, and what impact it made.

## 1. Tell me about your project at Traverse Globe.
- I worked on a travel website built in React 18.
- My work focused on performance, CMS integration, and lead capture.
- I improved speed, content updates, and business automation.

## 2. What was your role in the project?
- I worked as a Full Stack Developer Intern.
- I handled frontend optimization and CMS integration.
- I also worked on automation for lead collection.

## 3. Why was React 18 used?
- It supports a modern component-based UI.
- It works well for fast and scalable web apps.
- It fits well with lazy loading and code splitting.

## 4. What is an SPA?
- SPA means Single Page Application.
- The page updates without full reloads.
- It gives a faster and smoother user experience.

## 5. What problem did you solve first?
- The app was loading too much code at once.
- This slowed down the first screen and interaction.
- I reduced the startup load using better loading strategy.

## 6. How did you reduce bundle size?
- I split the app into smaller chunks.
- I avoided loading unused code on the first page.
- This reduced the total initial JavaScript size.

## 7. What is code splitting?
- It means dividing one big bundle into smaller parts.
- Only the required part loads first.
- This improves speed and reduces initial load.

## 8. What is lazy loading?
- Lazy loading means loading content only when needed.
- Non-critical pages load later.
- It helps the app start faster.

## 9. Why is lazy loading useful?
- It reduces the first load pressure.
- It improves user experience on slow networks.
- It makes the app feel faster.

## 10. What is TTI?
- TTI means Time to Interactive.
- It shows when the page becomes usable.
- Lower TTI means faster interactivity.

## 11. How did TTI improve?
- Less JavaScript was loaded upfront.
- The browser had less work during startup.
- The page became interactive sooner.

## 12. How much bundle size reduction did you achieve?
- I reduced the bundle size by 35 percent.
- This came from code splitting and lazy loading.
- It improved initial performance.

## 13. How much did TTI improve?
- TTI improved by 28 percent.
- The app responded faster after load.
- Users could interact earlier.

## 14. How did you measure performance?
- I used browser dev tools and performance checks.
- I compared before and after results.
- I focused on load time, bundle size, and interaction time.

## 15. Why is performance important for a travel website?
- Users expect quick browsing.
- Slow pages reduce trust and engagement.
- Fast pages improve conversions.

## 16. What is Sanity CMS?
- Sanity is a headless content management system.
- Content is managed separately from the frontend.
- It is easy to update without changing code.

## 17. Why did you integrate Sanity?
- To let non-developers update content.
- To remove the need for redeployment.
- To make content management faster.

## 18. What kind of content was managed in CMS?
- Travel packages.
- Destination details.
- Banners and marketing content.

## 19. What is a headless CMS?
- It stores content separately from the UI.
- The frontend fetches content through APIs.
- It gives flexibility and scalability.

## 20. How did CMS remove redeployments?
- Content moved from hardcoded data to CMS.
- Updates were published from Sanity directly.
- The site did not need code changes for every edit.

## 21. Why is CMS useful for the business?
- The team can update content quickly.
- Developers are not needed for small edits.
- It saves time and improves workflow.

## 22. How did you keep CMS content reliable?
- I used proper schema structure.
- I kept content fields consistent.
- I handled missing data carefully in the frontend.

## 23. What is lead capture?
- Lead capture means collecting user contact details.
- It helps the business follow up with interested users.
- It is important for sales and conversions.

## 24. What popup system did you build?
- I built a popup for lead collection.
- It appeared at a suitable time for the user.
- It helped capture visitor interest.

## 25. Why use a popup?
- It grabs attention at the right moment.
- It helps collect leads from interested users.
- It supports marketing and conversions.

## 26. How did you decide popup timing?
- I used user behavior signals.
- The popup showed after engagement, not immediately.
- This reduced irritation and improved relevance.

## 27. What is Zapier?
- Zapier is an automation tool.
- It connects different apps without manual work.
- It helps move data automatically from one place to another.

## 28. Why did you use Zapier?
- To automate lead transfer.
- To avoid manual copying of data.
- To make the flow faster and cleaner.

## 29. Why use Google Sheets?
- It is simple and easy to access.
- The business team can view leads quickly.
- It works well for lightweight lead tracking.

## 30. How did the lead flow work?
- User fills and submits the popup form.
- Zapier receives the data.
- The data is sent into Google Sheets automatically.

## 31. What was the benefit of this automation?
- It saved manual effort.
- It reduced the chance of missing leads.
- It made lead tracking faster.

## 32. How did you handle form validation?
- I checked required fields before submission.
- I made sure the data format was correct.
- This improved lead quality.

## 33. What if the automation failed?
- The form should show a clear message.
- Errors should be logged for debugging.
- The user should not lose confidence in the site.

## 34. Did you think about security?
- Yes, input validation was important.
- Sensitive keys should not be exposed in frontend code.
- Public forms should be protected from misuse.

## 35. How did you improve user experience?
- I made the site faster.
- I kept content fresh through CMS.
- I added useful lead capture without hurting usability.

## 36. How did you balance design and speed?
- I kept important content first.
- I delayed non-critical parts.
- I avoided loading too much at the start.

## 37. What metrics mattered most?
- Bundle size.
- TTI and page speed.
- Lead conversion and content update speed.

## 38. Why is bundle size important?
- Large bundles slow down the first load.
- They increase parse and execution time.
- Smaller bundles feel faster to users.

## 39. Why is TTI important?
- It shows when users can actually use the page.
- A page may look loaded but still not be interactive.
- Better TTI means better usability.

## 40. What was the biggest challenge?
- Keeping the app fast while adding features.
- Maintaining usability while improving performance.
- Managing content and automation cleanly.

## 41. What would you do differently now?
- Add more performance monitoring.
- Add more automated tests.
- Improve error handling around integrations.

## 42. How did this project help the business?
- It made the website faster.
- It made content updates easier.
- It improved lead capture efficiency.

## 43. How did it help non-technical users?
- They could update content in CMS.
- They did not need developer support.
- They could work faster and independently.

## 44. Why is this a full stack project?
- It included frontend work.
- It involved CMS and automation integration.
- It connected the website with business tools.

## 45. What APIs or integrations were used?
- Sanity CMS integration.
- Zapier workflow integration.
- Google Sheets data transfer.

## 46. How did you keep the codebase maintainable?
- I used reusable components.
- I kept features organized.
- I separated loading logic from main UI logic.

## 47. How would you explain code splitting simply?
- Load only what is needed first.
- Load the rest later when required.
- This keeps the app light and fast.

## 48. How would you explain lazy loading simply?
- Do not load everything at once.
- Load content when the user reaches it.
- This improves startup speed.

## 49. Give one strong one-line summary of your work.
- I improved a React 18 travel SPA by reducing bundle size, speeding up interactivity, integrating Sanity CMS, and automating lead capture.

## 50. Why should this project stand out?
- It improved speed.
- It improved content management.
- It improved business lead generation.

## Technical Interview Questions

## 51. How did you reduce the initial JavaScript bundle?
- I moved non-essential code out of the first load.
- I loaded features only when the user needed them.
- This made the app smaller and faster at startup.

## 52. What parts of the app were lazy loaded?
- Non-critical pages.
- Heavy components that were not needed on first view.
- Sections that could wait until user navigation.

## 53. Why is lazy loading better than loading everything at once?
- It reduces startup cost.
- It improves first interaction time.
- It gives a smoother experience on slow devices.

## 54. How does React help in building this project?
- It gives reusable UI components.
- It makes state and UI updates easier to manage.
- It works well for a dynamic travel website.

## 55. What is the purpose of React components?
- To split the UI into smaller parts.
- To reuse code across pages.
- To keep the project clean and maintainable.

## 56. Why did you choose a component-based structure?
- It improves readability.
- It makes updates easier.
- It helps scale the project without messy code.

## 57. How did you manage routing in the SPA?
- Each page was handled as a route.
- Navigation happened without full reloads.
- This kept the experience fast and smooth.

## 58. Why is client-side routing useful?
- It avoids full page refresh.
- It makes navigation feel faster.
- It improves app-like behavior.

## 59. What is the benefit of preloading or prefetching assets?
- It helps load important resources earlier.
- It reduces visible delays.
- It improves perceived performance.

## 60. How did you handle images in the project?
- I optimized image loading.
- I used only necessary image sizes when possible.
- I avoided heavy images on the initial screen.

## 61. Why are images important in a travel website?
- They affect user trust and appeal.
- Travel content depends heavily on visuals.
- Good images help conversion.

## 62. What was the role of Vite in the project?
- Vite gave faster development builds.
- It made local development quick.
- It works well with modern React applications.

## 63. Why is a fast build tool important?
- It improves developer productivity.
- It reduces waiting time during changes.
- It supports faster iteration.

## 64. How did you structure environment-based configuration?
- I separated different settings properly.
- I avoided hardcoding sensitive values.
- I kept configuration manageable across environments.

## 65. Why should sensitive keys not be exposed in frontend code?
- Frontend code is visible to users.
- Exposed keys can be misused.
- Security should be protected from public access.

## 66. How did you connect the frontend to Sanity CMS?
- I fetched content from Sanity data models.
- The UI rendered data dynamically.
- Content updates flowed directly into the site.

## 67. What is the benefit of dynamic content fetching?
- The site stays updated without redeploying.
- Content can be changed quickly.
- It reduces developer dependency.

## 68. How did you handle missing CMS data?
- I used fallback values.
- I checked for null or empty content.
- This prevented broken UI sections.

## 69. Why are schema definitions important in CMS?
- They keep data structured.
- They reduce content errors.
- They make frontend mapping more predictable.

## 70. How would you explain API integration in this project?
- The frontend communicated with external services.
- Sanity, Zapier, and Sheets worked as connected systems.
- Data moved automatically between them.

## 71. What is the benefit of automation in lead handling?
- It saves manual work.
- It reduces human error.
- It speeds up follow-up.

## 72. How did you make sure form data was valid?
- I checked required inputs.
- I verified basic formats.
- I prevented obvious bad submissions.

## 73. Why is validation needed on both frontend and backend?
- Frontend validation improves user experience.
- Backend validation improves security.
- Both together make the system reliable.

## 74. How did you improve perceived performance?
- I loaded the visible content first.
- I delayed less important sections.
- I kept the initial experience light.

## 75. What is perceived performance?
- It is how fast the app feels to the user.
- It is not only about real speed.
- A good UI can feel faster even before all data loads.

## 76. Why is TTI different from page load time?
- Page load time means the page finished loading resources.
- TTI means the page is ready for interaction.
- A page can load but still not be usable.

## 77. How would you explain bundle analysis?
- It is checking what makes the build heavy.
- It shows which files take the most space.
- It helps you find what to optimize.

## 78. What would you look for in a bundle report?
- Large third-party dependencies.
- Duplicate code.
- Unused or unnecessary modules.

## 79. Why should third-party libraries be used carefully?
- They can increase bundle size.
- They may slow down the app.
- Only useful libraries should be kept.

## 80. How did you keep the app maintainable during optimization?
- I made changes in small logical parts.
- I avoided mixing too many responsibilities.
- I kept the code readable.

## 81. What is the value of reusable components?
- They reduce duplicate code.
- They keep design consistent.
- They make updates easier.

## 82. How did you manage state in the project?
- I kept state only where it was needed.
- I avoided unnecessary complexity.
- I passed data in a clear way between components.

## 83. Why is good state management important?
- It avoids bugs.
- It makes UI logic easier to understand.
- It keeps the app predictable.

## 84. How did you handle popup visibility logic?
- I used trigger conditions based on user behavior.
- The popup was not shown immediately.
- This made the experience more user-friendly.

## 85. Why should popups be controlled carefully?
- Too many popups annoy users.
- Poor timing reduces trust.
- Good timing improves conversion.

## 86. How did you make lead capture more effective?
- I used a clear form.
- I timed the popup properly.
- I automated the submission flow.

## 87. Why is Google Sheets useful for lead tracking?
- It is easy to access.
- It is simple for the business team.
- It works well for quick lead management.

## 88. What is the risk of manual lead entry?
- Leads can be missed.
- Data can be entered incorrectly.
- The follow-up process becomes slow.

## 89. How did you reduce manual work for the team?
- I connected the form to automation tools.
- I removed the need for manual copying.
- I made data flow directly into Sheets.

## 90. How would you explain the role of Zapier in one line?
- It acted as the bridge between the website form and Google Sheets.

## 91. How did you ensure the website stayed responsive?
- I reduced what loaded at the start.
- I kept heavy tasks out of the initial render.
- I focused on fast interaction.

## 92. Why is responsiveness important in web apps?
- Users expect instant reactions.
- Slow interfaces feel broken.
- Responsiveness improves trust.

## 93. What is the importance of fallback UI?
- It prevents empty or broken screens.
- It helps when content is loading or missing.
- It improves stability.

## 94. How would you handle slow API responses?
- Show loading states.
- Use fallback content where needed.
- Avoid blocking the whole page.

## 95. What was your approach to debugging issues?
- I checked the exact failing part first.
- I tested changes one at a time.
- I used browser tools and logs to trace problems.

## 96. Why is testing important after optimization?
- Performance fixes can break behavior.
- Testing ensures the UI still works correctly.
- It protects against hidden regressions.

## 97. How would you test CMS-driven pages?
- I would verify content rendering.
- I would check missing and updated data cases.
- I would confirm layout stability.

## 98. How would you test the popup lead flow?
- I would test form submission.
- I would confirm Zapier receives the data.
- I would check that Sheets stores the lead properly.

## 99. What did you learn from this project technically?
- Performance matters as much as features.
- CMS integration makes content workflow easier.
- Automation improves business efficiency.

## 100. What is the strongest technical point from this project?
- I improved frontend performance.
- I made content editable without redeploying.
- I connected the site to automated lead generation.
