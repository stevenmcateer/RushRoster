# RushRoster

Created by Steven McAteer, Ethan Schutzman, Paul Shingleton, Sam Coache

RushRoster is a React web application designed to allow fraternities the ability to manage their potential new members (PNM) during rush season.

## Problem
Rush chairs act as the middleman between the brotherhood and the PNMs. They interview prospective members,create presentations to the brotherhood on these interviews, and then host multiple rounds of voting to determine who gets a bid. All of this data is usually contained in a spreadsheet for the brotherhood to view, making for an overall poor user experience. There is a lot of work that the rush chairs have to do to manage and communicate PNM data. So we have decided to condense it into a manageable web interface with database support.

## Solution

- RushRoster is designed for ease of use and viewing for the rush chairs as well as the brotherhood. The app will contain sections for viewing PNMs and viewing the rounds of bids (whether certain PNMs have a bid, the results of each round of voting). 
- The PNMs will be represented as a list, each item containing basic information, and is one click away from showing a more detailed view. Rush chairs will have special privileges being able to add/edit PNMs in the database, populating the list. Brothers will also be able to add comments to each PNM, as well as submit requests to the chairs to add/update information and PNMs (to prevent data griefing). 
- The bids voting section will be a three-columned list of PNMs that can be added by the rush chairs, each list item is a PNM, their name, picture, and voting result (bid, no bid, abstain (push to next round of voting)). Clicking on the item will show the detailed view. There can be the same PNM in multiple columns if they were abstained on voting. This way allows people to understand that voting already occurred and to resume previous conversations.

## Use cases

 - CRUD PNMs
 - Easy management of the new member voting process
 - Add, remove, and edit existing potential members to update their information as you get to know more about them.
 - In voting the bids can be given, abstained, or declined until round three where a decision has to be made by the brotherhood.

## Technical concepts

 - Database Storage:
   - Ease of sight in viewing data
   - Ease of interaction to CRUD data
   - Database storage of Rushee information includes a unique ID, name, major, a basic description, graduation year, dorm location, first semester grades, hometown, phone number, and an organization ID based on the organization giving out the bid.
   
 - Users Information:
    - Users account info stored in universal cookies on the application. These cookies provide access to the user's name, privilege level, authenticated access, and organization. Cookies are cleared upon logout to prevent persistence issues.
    - Sections of the site then can access these cookies and then load the information into the page. For example displaying the users name by the logout button.
    
 - Secure Login and Privileges:
    - Passwords are encrypted with the 'aes-256-ctr' cypher and transmitted over a SSL connection to the server for authentication.
    - Every user has a privilege level which is associated with an account type. Certain users cannot perform certain restricted actions and elements on the page are subject to conditional rendering based on that level.
    
- Conditional Rendering:
    - Conditional rendering for different tabs and elements on the page based on a users permission level
    - Some elements have success and failure states that are rendered based on the response from the server.
    
 - Form Validation:
    - The fields for the signup for use regex expressions to ensure the data is present before submission.
