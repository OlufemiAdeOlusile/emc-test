# Playwright EMC -TEST

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Test](#Test)

## Description

- Using a JavaScript-based automated testing tool of their choice;

- Navigate to https://www.medicines.org.uk/emc/browse-companies

- For each page of the company browser

- Capture details about the first, the third and the last company on the page. The details must include the company name, the logo and all contact information.

- Do not capture the information about the drugs related to that company

- Store the logo as an image in a folder

- Add the company details to an internal data structure. Include the filename of the image file

- Output the internal data structure of the company details as a JSON or XML file.


## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine. If not, follow the installation instructions provided in the [Node.js Package Manager Installation Guide](https://nodejs.org/en/download/package-manager#installing-nodejs-via-package-manager).

#### - Please note that several downloaded logo images are stored in the 'image' directory, and the most recent JSON file is located in the 'results' directory.

## Installation

```bash
cd playwright-emc-test
```

- Install the dependencies and the browsers.

```bash
npm install && npx playwright install
```

- Run the test.

```bash
npx playwright test
```

- Run the test in non-headless.

```bash
npx playwright test --headed
```

- Report the test result.

```bash
npm run report
```

- Json file and Image Folder.

```bash
View the results folder for Json File
View the image folder for downloaded logos
```


## Test

#### Overview

This testing approach was founded on the premise that the structure of company details
is well-defined, allowing for the establishment of a clear schema. 
This assumption is based on the need for consistency with existing schemas, 
ensuring backward compatibility and integration with other systems.

#### Defining a Schema
To maintain strict typing and structure, we defined a CompanyDetails type, 
capturing essential information about a company:

```typescript
export type CompanyDetails = {
  Name: string;
  Address?: string;
  Email?: string;
  Logo?: string;
  Telephone?: string;
  Fax?: string;
  Website?: string;
  MedicalInformationFax?: string;
  MedicalInformationDirectLine?: string;
  MedicalInformationEmail?: string;
  CustomerCareDirectLine?: string;
  OutOfHoursTelephone?: string;
  OutOfHoursContact?: string;
  AdverseEventReportingEmail?: string;
  AdverseEventReportingTelephone?: string;
  StockAvailability?: string;
  DrugSafetyEmail?: string;
};
```
This structured approach ensures that each piece of company information adheres to the defined types,
enhancing data integrity and type safety.

#### Handling Duplicates and Varied Data Sources
During the extraction of company details from the DOM, we encountered instances of duplicate entries 
and varied data formats (such as text within `<span>` tags and email addresses within `<a href>` tags). 
To address this:

- We implemented checks to append values for duplicate keys, ensuring no data is lost.
- We differentiated between text and hyperlink values, extracting the relevant information accordingly.

#### Optimizing Resource Usage
To optimize performance, particularly concerning image downloads, we implemented a check to avoid 
re-downloading existing logos. This not only saves bandwidth but also reduces the overall execution 
time of the tests.

#### Alternative Approach
An alternative approach could have been to forego a predefined schema and dynamically populate 
company details as encountered. For instance:
```typescript
const companyDetails: CompanyDetails = {
  Name: "XXXXX Company",
  Logo: "logo.png",
  Website: "https://XXXXX.com",
  ContactMethods: [
    { type: "Telephone", value: "123-456-7890", description: "Company Telephone" },
    { type: "Email", value: "info@XXXXX.com", description: "Email" },
  ],
};
```
This method offers flexibility and is particularly useful in scenarios where the data structure 
might not be well-defined or subject to change.

#### Conclusion
The chosen implementation strategy—whether it is a structured approach with a predefined schema or a more 
dynamic method—depends on the specific requirements and constraints of the project. Both strategies have 
their merits and can be selected based on the need for schema consistency, flexibility, and data integrity.