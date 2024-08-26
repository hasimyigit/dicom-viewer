# DICOM Viewer Project

This project is a web application to view and manage DICOM (Digital Imaging and Communications 
in Medicine) images of Patients. It is developed using React, CornerstoneJS and Zustand.

## Features

- Draw and measure on DICOM images
- Interact with ROI (Region of Interest) tools
- Open modal windows to examine the selected items in the table in detail.
- Save the drawings made on the DICOM images of each patient and redraw them repeatedly.


## Technologies

- **React**: User interface components
- **CornerstoneJS**: Image processing and tools for DICOM images
- **Zustand**: State management
- **Tailwind CSS**: Styling and design
- **React Router DOM**: Routing

## Usage

1. **Home Page**
   - Displays a table listing patients.
   - Click on a table row to access details for each patient.

2. **Viewer**
   - View DICOM images for the selected patient.
   - Interact with ROI tools and perform measurements.
   - Move your drawings to state and list your Drawing data.


## Components

- **Table**: A general data table component.
- **Modal**: A general modal window component.
- **PatientsTable**: Displays patient data in a table format.
- **PatientDetailsModal**: Shows patient details in a modal window.(lazy load)
- **Viewer**: The main component for viewing DICOM images.(lazy load)

## Coding Standards

- **Clean Code**: Writing clean and maintainable code.
- **Component Reusability**: Creating reusable components.
- **State Management**: Centralized state management with Zustand.
- **Custom Hooks**: Reduce code duplication, improve code quality and increase productivity.



## Contact

For questions and feedback, please contact [hasimyigitt@gmail.com](mailto:hasimyigitt@gmail.com).