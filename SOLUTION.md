# Assessment Management System Dashboard

## Project Overview

This project is an **Assessment Management System** that allows users to enter a candidate or test ID and view detailed performance results.

The original system only displayed raw scores. My goal was to **transform the data into an informative, visual, and user-friendly dashboard** that makes insights easy to understand.

### Key Objectives

- Present scores in a visually engaging way rather than just plain numbers.  
- Provide performance insights and breakdowns by category.  
- Enhance the user experience with responsive design, notifications, and loading states.  
- Adding the view time animation using IntersectionObserver animate the required element.
- Enable Light and Dark theme support for accessibility.  
- Includes features for exporting JSON, copying to clipboard, and generating a summary for easy sharing of assessment data.

---

## Time Spent

**6–8 hours**

---

## Approach

Instead of showing raw numbers like “65 out of 100”, I focused on creating a **visual, interactive, and informative dashboard**.

**Steps taken:**

1. **Data Fetching**
   - Used **TanStack Query (`useQuery`)** to fetch assessment data based on the entered ID.
   - Benefits:
     - Automatic handling of loading and error states.
     - Caching to prevent unnecessary API calls.
     - Clean separation of data fetching logic from UI.

2. **API Layer**
   - Used **Axios** with a centralized configuration for consistent API calls and error handling.
   - Displayed user-friendly error messages for invalid IDs or network issues.

3. **Dashboard Enhancements**
   - Converted raw API data into:
     - **Overall score percentage**
     - **Performance labels** (e.g., Strong, Average, Needs Improvement)
     - **Section-wise score breakdown**
     - **Visual charts** for easier understanding
     - **Status indicators** for answered/unanswered/completed sections
   - Example:
     - Instead of: `Score: 65/100`  
     - Displayed:
       - Percentage visualization
       - Performance summary
       - Category breakdown
       - Insight messages explaining performance

4. **Global State Management**
   - Used **React Context API** to manage global values such as theme selection.
   - Avoided prop drilling and kept app structure cleaner.

5. **UX Improvements**
   - Added loading indicators while fetching data.
   - Implemented **react-hot-toast** for success/error notifications.
   - Improved spacing, alignment, and readability.
   - Made the layout responsive across devices.

6. **Theme Support (Light & Dark)**
   - Used **CSS variables** for consistent color tokens.
   - Ensured charts and UI components adapt correctly to theme changes.
   - Managed theme switching with **global state**.

7. **Data Export & Copy**
   - Implemented **JSON download** for assessment results.
   - Added **copy-to-clipboard** functionality for easy sharing.
   - Provided a **summary view** highlighting key insights.

---

## Tools & Libraries Used

- **React**  
- **TypeScript**  
- **TanStack Query**  
- **Axios**  
- **React Hot Toast**  
- **React Context API**  
- **ReCharts** (for visualizations)  
- **AI Assistance:** ChatGPT – used for validating approach and improving structure  

---

## Testing

Tested the dashboard by:

- Entering valid IDs and verifying the displayed data.
- Entering invalid IDs to ensure error handling works.
- Checking loading states during API calls.
- Testing edge cases:
  - Very low scores
  - Very high scores
  - Incomplete assessments
- Verifying charts accurately reflect the API data.
- Testing JSON download and copy functionality for correctness.

---

## Outcome

The dashboard is now:

- **Visual & intuitive:** Makes performance easy to interpret at a glance.  
- **Responsive & polished:** Works well on desktop and mobile screens.  
- **Accessible:** Supports both Light and Dark themes.  
- **Interactive:** Provides insights and data export options.