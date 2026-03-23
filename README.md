# Multi-View Project Tracker UI

A fully functional frontend project management application built using **React + TypeScript**, implementing advanced UI engineering concepts like **custom drag-and-drop**, **virtual scrolling**, and **real-time collaboration simulation** — without using external UI or drag libraries.

---

## Live Demo

  https://your-project.vercel.app
  GitHub Repo: https://github.com/your-username/project-tracker

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
git clone https://github.com/your-username/project-tracker.git
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

## Deployment

Deployed on Vercel:
👉 https://your-project.vercel.app

---

## Final Notes

This project demonstrates:

* Advanced frontend engineering
* Performance optimization
* Clean architecture
* Real-world UI problem solving

---
