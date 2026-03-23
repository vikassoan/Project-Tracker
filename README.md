# Multi-View Project Tracker UI

A fully functional frontend project management application built using **React + TypeScript**, implementing advanced UI engineering concepts like **custom drag-and-drop**, **virtual scrolling**, and **real-time collaboration simulation** — without using external UI or drag libraries.

---

## Live Demo

  [Live Demo](https://projectttracker.netlify.app/)
  GitHub Repo: https://github.com/vikassoan/Project-Tracker

---

## Features

### 1. Multi-View System

The application supports three synchronized views using a **single shared dataset**:

#### Kanban Board

* Four columns: To Do, In Progress, In Review, Done
* Task cards with:

  * Title
  * Assignee initials (no images)
  * Priority badge (color-coded)
  * Due date with overdue highlighting
* Independent column scrolling
* Empty state + skeleton UI

#### List View (Table)

* Flat table of all tasks
* Sortable columns:

  * Title (A–Z)
  * Priority (Critical → Low)
  * Due date (earliest first)
* Toggle sort direction (↑ ↓ indicator)
* Inline status update (dropdown inside row)
* Virtual scrolling for performance (500+ tasks)

#### Timeline / Gantt View

* Horizontal time axis (current month)
* Tasks rendered as bars (start → due date)
* Priority-based color coding
* Today marker (vertical line)
* Tasks without start date shown as single-day markers
* Horizontal scroll support

---

### 2. Custom Drag-and-Drop (No Libraries)

Implemented from scratch using **pointer events**:

* Drag tasks between Kanban columns
* Floating drag preview follows cursor
* Placeholder prevents layout shift
* Drop zone highlighting
* Snap-back animation if dropped outside
* Works for both mouse and touch

---

### 3. Virtual Scrolling (List View)

Implemented without libraries:

* Renders only visible rows + buffer
* Maintains correct scroll height
* Smooth scrolling without flicker
* Efficient rendering for 500+ tasks

---

### 4. Live Collaboration Simulation

Simulated real-time user presence:

* 2–4 users moving across tasks
* Avatar indicators on active tasks
* Multiple users stacked with "+1" overflow
* Top bar shows active users count
* Movement simulated via interval updates

---

### 5. Filters + URL Sync

* Filters:

  * Status (multi-select)
  * Priority (multi-select)
  * Assignee (multi-select)
  * Date range
* Instant filtering (no submit button)
* URL query sync (shareable state)
* Back/forward navigation restores filters
* Skeleton UI when no results

---

### 6. UI/UX Enhancements

* Skeleton loading states
* Responsive design (desktop + tablet)
* Smooth animations
* Sticky headers
* Empty states with proper UX

---

## Tech Stack

* React (Vite)
* TypeScript
* Zustand (state management)
* Tailwind CSS

---

## State Management Choice

I chose **Zustand** over React Context because:

* Simpler and more scalable for global state
* Avoids prop drilling
* Better performance with selective subscriptions
* Cleaner separation of logic

---

## Drag-and-Drop Implementation

The drag-and-drop system was built using **pointer events** instead of external libraries:

* `onPointerDown` → start drag
* `pointermove` → track cursor position
* `pointerup` → handle drop
* Floating preview rendered using fixed positioning
* Placeholder inserted to prevent layout shift
* Drop detection handled via column hover state
* Snap-back achieved by resetting state

---

## Virtual Scrolling Implementation

Virtual scrolling was implemented manually:

* Fixed row height used for calculations
* Scroll position determines visible range
* Only visible rows + buffer rendered
* Spacer elements simulate full height
* Prevents DOM overload and improves performance

---

## Setup Instructions

```bash
git clone https://github.com/your-username/Project-Tracker.git
cd project-tracker
npm install
npm run dev
```

---

## Performance

* Lighthouse Score: **85+ (Desktop)**
* Optimizations:

  * Virtual scrolling
  * Memoized components
  * Minimal re-renders

---

## Edge Cases Handled

* Empty columns in Kanban
* No results after filtering
* Tasks overdue by >7 days
* Tasks due today
* Tasks without start date
* Large dataset (500+ tasks)

---

## Explanation (Task Requirement)

**Hardest UI Problem:**
The most challenging part was implementing **custom drag-and-drop with placeholder handling**. Maintaining layout stability while dragging required inserting a placeholder with identical height, ensuring no layout shift during movement.

**Handling Placeholder Without Layout Shift:**
Instead of removing the dragged element, a placeholder element was rendered in its original position. This preserved the layout flow while the actual card was rendered as a floating preview.

**What I Would Refactor:**
With more time, I would extract drag logic into a more reusable abstraction and improve accessibility (keyboard drag support).

---

##  Performance Optimization Journey (56 → 90+ Lighthouse)

Initially, the application scored around **56 in Lighthouse Performance**, primarily due to heavy initial rendering and blocking JavaScript execution. The following optimizations were systematically applied to achieve a **90+ score**:

###  Problem Analysis

The main issues identified were:

* Large dataset (200–500 tasks) processed on initial render
* Multiple views (Kanban, List, Timeline) loaded simultaneously
* Expensive filtering and sorting running on every render
* High DOM node count in Kanban and Timeline views
* No code splitting (entire app bundled together)
* UI blocked during synchronous data generation

---

###  Optimizations Applied

#### 1. Lazy Loading (Code Splitting)

Implemented `React.lazy` and `Suspense` to load views only when required:

* Prevented unnecessary loading of all views at startup
* Reduced initial bundle size significantly
* Improved First Contentful Paint (FCP)

---

#### 2. Deferred Data Initialization

Used `requestIdleCallback` to defer heavy task generation:

* Allowed UI to render instantly
* Moved expensive computation off the critical render path
* Reduced Total Blocking Time (TBT)

---

#### 3. Memoization (useMemo)

Optimized expensive computations:

* Filtering and sorting wrapped in `useMemo`
* Prevented redundant recalculations
* Improved render efficiency

---

#### 4. Zustand Selector Optimization

Replaced full-store subscriptions:

```ts
const { tasks, filters } = useTaskStore(); ❌
```

with selective subscriptions:

```ts
const tasks = useTaskStore((s) => s.tasks);
const filters = useTaskStore((s) => s.filters);
```

* Reduced unnecessary re-renders
* Improved component isolation

---

#### 5. Component Memoization

Applied `React.memo` to:

* TaskCard (Kanban)

* Row (List View)

* Prevented re-rendering unchanged components

* Improved performance in large lists

---

#### 6. Reduced Initial DOM Load

* Limited initial Kanban rendering (e.g., first 20 tasks per column)
* Avoided rendering hundreds of elements simultaneously
* Reduced layout calculation cost

---

#### 7. Virtual Scrolling (List View)

* Only visible rows rendered
* Spacer elements maintain scroll height
* Prevents DOM overload

---

#### 8. Skeleton-Based Loading Strategy

* Avoided blocking UI during data load
* Improved perceived performance
* Reduced layout shifts

---

###  Result

| Metric                 | Before | After  |
| ---------------------- | ------ | ------ |
| Performance Score      | ~56    | 85–95+ |
| First Contentful Paint | Slow   | Fast   |
| Total Blocking Time    | High   | Low    |
| User Perception        | Laggy  | Smooth |

---

![Reference Image](/project-trcaker/public/screenshot.png)

---

##  Skeleton UI Strategy

To improve both **user experience and perceived performance**, a structured skeleton loading system was implemented.

---

###  Types of Skeletons Used

#### 1. App-Level Skeleton (Initial Load)

Displayed before data initialization:

* Mimics full layout (buttons, filters, Kanban columns)
* Prevents blank screen
* Used with global `loading` state

---

#### 2. Suspense Fallback Skeleton

Used during lazy loading:

```tsx
<Suspense fallback={<AppSkeleton />}>
```

* Ensures smooth transition between views
* Eliminates “Loading...” text flashes

---

#### 3. View-Level Skeletons

Each view has its own skeleton:

* Kanban → column + card placeholders
* List → table row placeholders
* Timeline → bar placeholders

---

#### 4. Filter Empty State Skeleton

Instead of empty UI:

* Shows skeleton placeholders
* Maintains layout consistency
* Avoids abrupt visual gaps

---

###  Why Skeleton Instead of Spinner?

Skeleton UI was chosen because:

* Preserves layout structure
* Reduces perceived wait time
* Prevents layout shift (CLS)
* Provides visual continuity

---

###  Implementation Highlights

* Reusable `Skeleton` component
* Tailwind-based shimmer effect
* Conditional rendering based on:

  * `loading`
  * `tasks.length`
  * `filteredTasks.length`

---

##  Key Learnings

* Performance is not just about speed, but **perceived responsiveness**
* Avoid heavy work during initial render
* Memoization and selective subscriptions are critical in large datasets
* Skeleton UI significantly improves UX even when actual load time is unchanged

---

## Deployment

Deployed on Netlify:
  [Live Demo](https://projectttracker.netlify.app/)


---

## Final Notes

This project demonstrates:

* Advanced frontend engineering
* Performance optimization
* Clean architecture
* Real-world UI problem solving

---
