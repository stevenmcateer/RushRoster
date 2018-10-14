# RushRoster


Created by Steven McAteer, Ethan Schutzman, Paul Shingleton, Sam Coache

http://fp-rushroster.herokuapp.com
Admin login: hash@test.com : test

Rush Roster is an organizational management tool for both Chairs and members of Greek Life organizations to collaborate on managing prospective new members (PNM) from a social media perspective.

## Problem
Rush/Recruitment Chairs act as the middlemen between the organization and the PNMs. They interview prospective members, create presentations to the org on these interviews while hosting multiple rounds of voting to determine who gets a bid. All of this data is usually contained in a messy spreadsheet for the org to view, making for overall poor user experience. There is much work that the Chairs have to do to manage and communicate PNM data. We have decided to condense it into a flexible web interface that allows for ease-of-display for this information.

## Solution

- RushRoster is designed for ease of use and viewing for the rush chairs as well as the brotherhood. The app contains sections for viewing PNMs and viewing the rounds of bids (whether certain PNMs have a bid, the results of each round of voting). 
- The PNMs are represented as a list, each item containing the necessary information, and is one click away from showing a more detailed view. Rush chairs have special privileges being able to add/edit PNMs in the database, populating the list. Brothers are also able to add comments to each PNM, as well as submit requests to the chairs to add/update information and PNMs (to prevent data griefing). 
- The bids voting section is a three-columned list of PNMs that can be added by the rush chairs, each list item is a PNM, their name, picture, and voting result (bid, no bid, abstain (push to next round of voting)). Clicking on the item shows the detailed view. There can be the same PNM in multiple columns if they abstained on voting. This way allows people to understand that voting already occurred and to resume previous conversations.

## Use cases

 - CRUD PNMs
 - Easy management of the new member voting process
 - Add, remove, and edit existing potential members to update their information as you get to know more about them.
 - In voting the bids can be given, abstained, or declined until round three where a decision has to be made by the brotherhood.

## Technical concepts

 - Database Storage:
   - Ease of sight in viewing data
   - Ease of interaction to CRUD data
   - User passwards are stored as hashed values in the database to prevent easy enumeration.
   - Database storage of Rushee information includes a unique ID, name, major, a basic description, graduation year, dorm location, first semester grades, hometown, phone number, and an organization ID based on the organization giving out the bid.
   
 - Users Information:
    - Users account info stored in universal cookies on the application. These cookies provide access to the user's name, privilege level, authenticated access, and organization. Upon logging out, cookies are wiped to prevent persistence issues.
    - Sections of the site can access these cookies and then load the information into the page. For example, displaying the user's name by the logout button.
    
 - Account creation and management 
   - Accounts are created on the signup page and are added to a pending users database for the specified organization.
   - Pending accounts can then be approved by authorized users giving them access to the Rush application for that group.
   - Admins can manage user levels on a 4 level scale of basic user, rush chair, head rush chair, or admin. Only an user with a higher permission level can make these changes.
    
 - Secure Login and Privileges:
    - Passwords are encrypted with the 'aes-256-ctr' cypher and transmitted over a SSL connection to the server for authentication.
    - Every user has a privilege level which is associated with an account type. Some users cannot perform specific restricted actions and elements on the page are subject to conditional rendering based on that level.
    
- Conditional Rendering:
    - Conditional rendering for different tabs and elements on the page based on a users permission level
    - Some elements have success and failure states that are rendered based on the response from the server.
    
 - Form Validation:
    - The fields for the signup for use regex expressions to ensure the data is present before submission.
