## Project Overview

This project is an Assessment Management System where a user enters a candidate or test ID, and the system displays detailed performance results.

The original version only showed basic information. My task was to improve it by turning the raw API data into a proper dashboard with:

Visual charts

Clear score breakdowns

Better UI and user experience

Easy-to-understand performance insights

The main goal was to make the results meaningful and simple to understand instead of just displaying numbers.

## Time Spent
6 - 8 hours

## Approach

Instead of just showing scores like “65 out of 100”, I focused on making the data more visual and informative.

Here’s how I approached it:

Used TanStack Query to fetch assessment data based on the entered ID.

Processed and transformed the API response into useful metrics like percentages and performance labels.

Displayed the data using charts and structured breakdown sections.

Improved the overall experience by handling loading states, errors, and notifications properly.

Kept the code clean and organized so it’s scalable for future improvements.

I wanted the dashboard to feel professional and easy to read — not just functional.

## Implementation Details

 ### Data Fetching

I used TanStack Query (useQuery) to fetch assessment results dynamically when a user enters an ID.

It helped me:

Handle loading and error states automatically

Cache data to prevent unnecessary API calls

Keep the components clean and focused on UI

### API Layer

I used Axios with a centralized configuration file.

This helped me:

Keep API calls organized

Handle errors consistently

Show user-friendly error messages

### Dashboard Enhancements

Instead of displaying plain numbers, I converted the raw API data into:

Overall score percentage

Performance labels (e.g., strong, average, needs improvement)

Section-wise breakdown of scores

Visual charts for better understanding

Status indicators (answered, unanswered, completed, etc.)

For example, instead of showing:

Score: 65/100

I displayed:

A percentage visualization

A performance summary

Category-wise breakdown

Insight messages explaining the performance

This makes it much easier for users to quickly understand how well the candidate performed.

### Global State

I used React Context API to manage shared state across components.

This helped me:

Avoid prop drilling

Keep global values centralized

Make the app structure cleaner

### UX Improvements

To improve the overall experience, I:

Added loading indicators while data is being fetched

Showed error notifications if the ID is invalid

Used react-hot-toast for success and error feedback

Improved spacing, alignment, and readability

Made the layout responsive for different screen sizes

These improvements made the dashboard feel smoother and more polished.

### Theme Support (Light & Dark Mode)

I implemented Light and Dark theme support to improve accessibility and user experience.

Added theme-based styling using CSS variables
.
Maintained consistent color tokens for text,background, borders, and charts.

Ensured charts and UI components adapt properly inboth themes.

Used global state (Context API) to manage themeswitching.


## Tools & Libraries Used

React

TypeScript

TanStack Query

Axios

React Hot Toast

React Context API

ReChart library (for visualizations)

## AI tools used: ChatGPT
I used it mainly for validating my approach and improving the structure of the implementation.

## Testing

I tested the dashboard by:

Entering valid IDs and verifying the data displayed correctly

Entering invalid IDs and checking that error messages appear

Checking loading states during API calls

Testing edge cases like very low scores, very high scores, and incomplete tests

Making sure the charts correctly reflect the API data